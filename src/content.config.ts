import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/*
  Editorial discipline — encoded as type-safety so the build fails if I
  violate the brand.

  Tag limits:
    - Max 5 tags per entry. More than 5 is noise, not signal. A post that
      needs 8 tags is actually 2 posts.
    - Max 24 chars per tag. Forces single-word or hyphenated-short forms;
      prevents "distributed-systems-architecture" from bloating the meta row.

  Neither limit is cosmetic. Both are load-bearing under FCA: the meta row
  layout is designed for 1–5 short chips, and the schema enforces that
  contract at write-time so the layout never has to apologize for the data.
*/
const TAG_SCHEMA = z.array(z.string().min(1).max(24)).max(5).optional();

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
    tags: TAG_SCHEMA,
    draft: z.boolean().optional().default(false),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    year: z.string().regex(/^\d{4}$/, "Year must be YYYY"),
    type: z.string(),
    tags: TAG_SCHEMA,
    status: z.enum(["Shipped", "In progress", "Archived"]).default("Shipped"),
    role: z.string().optional(),
    stack: z.array(z.string()).optional(),
    liveUrl: z.string().url().optional(),
    sourceUrl: z.string().url().optional(),
    featured: z.boolean().optional().default(false),
    order: z.number().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, work };
