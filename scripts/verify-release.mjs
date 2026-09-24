import { execFileSync } from 'node:child_process';
import { validatePagesDeployment } from './releaseGate.mjs';

function option(name) {
  const index = process.argv.indexOf('--' + name);
  return index < 0 ? null : process.argv[index + 1] ?? null;
}

const owner = option('owner');
const repo = option('repo');
const version = option('version');
const expectedCommit = option('commit');
const url = option('url');
if (![owner, repo, version, expectedCommit, url].every(Boolean)) {
  console.error('Usage: node scripts/verify-release.mjs --owner OWNER --repo REPO --version X.Y.Z --commit SHA --url URL');
  process.exit(2);
}

const endpoint = 'repos/' + owner + '/' + repo + '/pages/builds/latest';
const pageBuild = JSON.parse(execFileSync('gh', ['api', endpoint], { encoding: 'utf8' }));
const errors = validatePagesDeployment(pageBuild, expectedCommit);

if (!errors.length) {
  const response = await fetch(url + (url.includes('?') ? '&' : '?') + 'releaseCheck=' + Date.now(), { redirect: 'follow' });
  const html = await response.text();
  if (!response.ok) errors.push('Public release URL returned HTTP ' + response.status + '.');
  if (!html.includes('v' + version)) errors.push('Public release URL does not contain v' + version + '.');
}

if (errors.length) {
  console.error('Public release verification failed:');
  for (const error of errors) console.error('- ' + error);
  process.exit(1);
}

console.log('Public release verification passed for v' + version + ' at ' + url + '.');
