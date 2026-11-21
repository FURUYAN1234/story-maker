import * as z from 'zod/v4';
export const app = "story-maker";
export const prefix = "story";
const portOverride = Number(process.env.STORY_MAKER_MCP_PORT ?? 45932);
if (!Number.isInteger(portOverride) || portOverride < 1024 || portOverride > 65535) throw new Error('Invalid Story Maker MCP port');
export const port = portOverride;
export const operation = "generate_manga_script";
export const description = "Generate a manga scenario in the current provider session. Omit book for the original 4–8 panel single page. Use book.mode fixed with pagePanelCounts, or auto for Story Maker to select the count. Poll job_get and use the structured book.pages for multi-page handoff.";
const panelCount = z.number().int().min(4).max(8);
const bookRequest = z.discriminatedUnion('mode', [
  z.object({ mode: z.literal('fixed'), pagePanelCounts: z.array(panelCount).min(2).max(50) }).strict(),
  z.object({ mode: z.literal('auto') }).strict(),
]);
const page = z.object({ pageNumber: z.number().int().min(1).max(50), panelCount, beat: z.string().min(1), scenario: z.string().min(1).max(200000) }).strict();
const book = z.object({ title: z.string().min(1), summary: z.string().min(1), pages: z.array(page).min(2).max(50) }).strict();
export const input = z.object({ brief: z.string().trim().min(1).max(12000), book: bookRequest.optional() }).strict();
export const output = z.object({ scenario: z.string().min(1).max(400000), characters: z.string().max(80000), mangaInput: z.string().min(1).max(480000), book: book.optional() }).strict();
