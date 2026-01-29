import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './template/src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional().default(999),
    category: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './template/src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    image: z.string().optional(),
    series: z.string().optional(),
    order: z.number().optional().default(1),
  }),
});

const tutorialsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './template/src/content/tutorials' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional().default('beginner'),
    duration: z.string().optional(),
    prerequisites: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    order: z.number().optional().default(999),
  }),
});

export const collections = {
  docs: docsCollection,
  blog: blogCollection,
  tutorials: tutorialsCollection,
};
