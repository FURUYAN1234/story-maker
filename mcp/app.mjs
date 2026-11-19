import * as z from 'zod/v4';
export const app = "story-maker";
export const prefix = "story";
export const port = 45932;
export const operation = "generate_manga_script";
export const description = "Generate a 4–8 panel manga scenario using Story Maker’s current form and provider settings. The brief is the supplemental instruction. Wait for job_get and pass the validated scenario and character text into the manga application.";
export const input = z.object({ brief: z.string().trim().min(1).max(12000) }).strict();
export const output = z.object({ scenario: z.string().min(1).max(200000), characters: z.string().max(80000), mangaInput: z.string().min(1).max(280000) }).strict();
