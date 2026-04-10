import { defineCollection, z } from 'astro:content';

const log = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional().default(''),
    tags: z.array(z.string()).optional().default([]),
    keyIdeas: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { log };
