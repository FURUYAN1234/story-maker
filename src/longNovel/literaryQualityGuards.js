const DEFAULT_FIRST_PERSONS = ['私', '俺', '僕', 'あたし', 'わたし', 'おれ', 'ぼく'];

const LEXICAL_BUDGETS = [
  { term: 'ゆっくり', per4000: 5 },
  { term: '視線', per4000: 6 },
  { term: '沈黙', per4000: 4 },
  { term: '静か', per4000: 5 },
  { term: '震え', per4000: 4 },
  { term: '何も言わ', per4000: 3 },
  { term: '見つめ', per4000: 5 },
  { term: '息を', per4000: 7 },
];

const STATIC_ENDING_TAGS = [
  { tag: 'silence', patterns: [/沈黙/g, /黙/g, /何も言わ/g] },
  { tag: 'slow_motion', patterns: [/ゆっくり/g, /そっと/g, /静か/g] },
  { tag: 'looking', patterns: [/視線/g, /見つめ/g, /目を/g] },
  { tag: 'object_left', patterns: [/置い/g, /残され/g, /机/g, /封筒/g, /ノート/g, /鉛筆/g] },
  { tag: 'door_or_exit', patterns: [/ドア/g, /扉/g, /閉ま/g, /出てい/g] },
  { tag: 'dawn_light', patterns: [/夜明け/g, /朝/g, /光/g] },
];

export function buildCharacterVoiceProfiles(bible = {}) {
  return (bible.characters || [])
    .map(character => {
      const names = [character.canonName, ...(character.aliases || [])]
        .map(value => String(value || '').trim())
        .filter(Boolean);
      const allowed = normalizeList(character.allowedFirstPerson || character.firstPerson);
      const roleDefaultAllowed = character.role === 'protagonist' ? ['私'] : [];
      const allowedFirstPerson = allowed.length ? allowed : roleDefaultAllowed;
      const explicitForbidden = normalizeList(character.forbiddenFirstPerson);
      const forbiddenFirstPerson = explicitForbidden.length
        ? explicitForbidden
        : DEFAULT_FIRST_PERSONS.filter(term => allowedFirstPerson.length && !allowedFirstPerson.includes(term));
      return {
        id: character.id,
        role: character.role || '',
        names,
        allowedFirstPerson,
        forbiddenFirstPerson,
      };
    })
    .filter(profile => profile.names.length && profile.forbiddenFirstPerson.length);
}

export function describeVoiceProfiles(bible = {}) {
  const profiles = buildCharacterVoiceProfiles(bible);
  if (!profiles.length) return '- No explicit voice profiles.';
  return profiles.map(profile => {
    const allowed = profile.allowedFirstPerson.length ? profile.allowedFirstPerson.join(' / ') : 'unspecified';
    const forbidden = profile.forbiddenFirstPerson.length ? profile.forbiddenFirstPerson.join(' / ') : 'none';
    return `- ${profile.names.join(' / ')}: allowed first-person=${allowed}; forbidden first-person=${forbidden}`;
  }).join('\n');
}

export function findSpeakerPronounIssue(text, bible = {}) {
  const source = normalize(text);
  if (!source) return null;
  const profiles = buildCharacterVoiceProfiles(bible);
  if (!profiles.length) return null;
  const paragraphs = source.split(/\n+/).filter(Boolean);
  for (const paragraph of paragraphs) {
    for (const match of paragraph.matchAll(/「([^」]{2,700})」/g)) {
      const quote = match[1] || '';
      const speaker = identifySpeaker(paragraph, match.index, match.index + match[0].length, profiles);
      if (!speaker) continue;
      const badPronoun = speaker.forbiddenFirstPerson.find(pronoun => quote.includes(pronoun));
      if (!badPronoun) continue;
      return {
        character: speaker.names[0],
        pronoun: badPronoun,
        quote: trimEvidence(quote),
        allowedFirstPerson: speaker.allowedFirstPerson,
      };
    }
  }
  return null;
}

export function findLexicalOveruse(text, options = {}) {
  const source = normalize(text);
  const charCount = countChars(source);
  if (charCount < (options.minChars || 900)) return [];
  const scale = Math.max(1, charCount / 4000);
  return LEXICAL_BUDGETS
    .map(budget => {
      const count = countOccurrences(source, budget.term);
      const limit = Math.max(3, Math.ceil(budget.per4000 * scale));
      return { term: budget.term, count, limit };
    })
    .filter(item => item.count > item.limit);
}

export function getLowInformationLexicalBudgets() {
  return LEXICAL_BUDGETS.map(item => ({ ...item }));
}

export function getEndingTagCatalog() {
  return STATIC_ENDING_TAGS.map(item => item.tag);
}

export function classifyEndingTags(text, options = {}) {
  const tail = endingScope(text, options.tailChars || 260);
  const tags = [];
  for (const entry of STATIC_ENDING_TAGS) {
    const hits = entry.patterns.reduce((total, pattern) => total + countMatches(tail, pattern), 0);
    if (hits) tags.push(entry.tag);
  }
  return tags;
}

function endingScope(text, tailChars) {
  const source = normalize(text);
  const paragraphs = source.split(/\n{2,}/).map(item => item.trim()).filter(Boolean);
  const lastParagraph = paragraphs[paragraphs.length - 1] || '';
  if (lastParagraph && countChars(lastParagraph) <= tailChars * 1.4) {
    return lastParagraph.slice(-tailChars);
  }
  return source.slice(-tailChars);
}

export function findFormulaicEnding(text) {
  const tags = classifyEndingTags(text);
  if (tags.length < 3) return null;
  const tail = normalize(text).slice(-220);
  const choiceHits = countMatches(tail, /選|決め|断|受け取|渡|書|破|捨て|開け|閉じ|置き直|戻し|歩/g);
  if (choiceHits >= 2 && !tags.includes('silence')) return null;
  return {
    tags,
    evidence: trimEvidence(tail),
  };
}

export function findChapterEndingVarietyIssues(chapters = []) {
  const tagged = chapters.map(chapter => ({
    chapter: chapter.chapter,
    tags: classifyEndingTags(chapter.body),
  }));
  const warnings = [];
  for (let index = 1; index < tagged.length; index++) {
    const overlap = tagged[index].tags.filter(tag => tagged[index - 1].tags.includes(tag));
    if (overlap.length >= 2) {
      warnings.push({
        code: 'chapter_ending_motion_repeat',
        chapter: tagged[index].chapter,
        message: `Chapter ${tagged[index - 1].chapter} and ${tagged[index].chapter} repeat ending motion tags: ${overlap.join(', ')}.`,
        tags: overlap,
      });
    }
  }
  for (const tag of STATIC_ENDING_TAGS.map(entry => entry.tag)) {
    const chaptersWithTag = tagged.filter(item => item.tags.includes(tag)).map(item => item.chapter);
    if (chaptersWithTag.length >= Math.max(4, Math.ceil(tagged.length * 0.45))) {
      warnings.push({
        code: 'chapter_ending_tag_overused',
        message: `Ending motion tag "${tag}" appears in ${chaptersWithTag.length}/${tagged.length} chapters.`,
        chapters: chaptersWithTag,
        tag,
      });
    }
  }
  return warnings;
}

function identifySpeaker(paragraph, quoteStart, quoteEnd, profiles) {
  const before = paragraph.slice(Math.max(0, quoteStart - 120), quoteStart);
  const after = paragraph.slice(quoteEnd, quoteEnd + 140);
  const beforeSpeaker = findSpeakerInContext(before, profiles, 'before');
  if (beforeSpeaker) return beforeSpeaker;
  return findSpeakerInContext(after, profiles, 'after');
}

function findSpeakerInContext(context, profiles, side) {
  let best = null;
  for (const profile of profiles) {
    for (const name of profile.names) {
      const index = side === 'before' ? context.lastIndexOf(name) : context.indexOf(name);
      if (index < 0) continue;
      const slice = side === 'before' ? context.slice(index) : context.slice(index, index + 90);
      if (isAttribution(slice)) {
        const distance = side === 'before' ? context.length - index : index;
        if (!best || distance < best.distance) best = { profile, distance };
      }
    }
  }
  return best?.profile || null;
}

function isAttribution(slice) {
  return /(?:は|が|も|の声|は、|が、).{0,70}(?:言|聞|答|尋|呟|つぶや|囁|ささや|笑|吐|続け|首を|目を|顔を|息を|言い直)/.test(slice)
    || /(?:は|が|も|は、|が、).{0,28}$/.test(slice);
}

function normalizeList(value) {
  if (!value) return [];
  const list = Array.isArray(value) ? value : [value];
  return list.flatMap(item => String(item || '').split(/[、,/\s]+/)).map(item => item.trim()).filter(Boolean);
}

function normalize(text) {
  return String(text || '').replace(/\r\n?/g, '\n').trim();
}

function countChars(text) {
  return normalize(text).replace(/\s/g, '').length;
}

function countOccurrences(text, term) {
  if (!term) return 0;
  return text.split(term).length - 1;
}

function countMatches(text, pattern) {
  return [...String(text || '').matchAll(pattern)].length;
}

function trimEvidence(text) {
  return String(text || '').replace(/\s+/g, ' ').trim().slice(0, 180);
}
