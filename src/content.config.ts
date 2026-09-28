import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ---------- Schemi condivisi ---------- */

const mediaAsset = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const videoAsset = z.object({
  kind: z.enum(['stream', 'r2', 'youtube', 'bunny']),
  src: z.string(),
  poster: z.string().optional(),
  alt: z.string(),
});

const hero = z.discriminatedUnion('type', [
  z.object({ type: z.literal('image'), image: mediaAsset }),
  z.object({ type: z.literal('video'), video: videoAsset }),
]);

const infoBox = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string().optional(),
});

const cta = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'secondary', 'ghost']).default('primary'),
});

const seo = z.object({
  description: z.string(),
  ogImage: z.string().optional(),
});

/* ---------- Collezioni ---------- */

const programs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/programs' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(),
    hero,
    intro: z.string().optional(),
    infoBoxes: z.array(infoBox).default([]),
    ctas: z.array(cta).default([]),
    gallery: z
      .object({
        images: z.array(mediaAsset).default([]),
        videos: z.array(videoAsset).default([]),
      })
      .optional(),
    note: z.string().optional(),
    contactEmail: z.string().email().optional(),
    seo,
  }),
});

const waterEditions = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/waterEditions' }),
  schema: z.object({
    year: z.number(),
    title: z.string(),
    summary: z.string(),
    hero,
    weeks: z.number().optional(),
    themes: z.array(z.string()).default([]),
    format: z.array(z.string()).default([]),
    jury: z.string().optional(),
    prize: z.string().optional(),
    gallery: z.array(mediaAsset).default([]),
    note: z.string().optional(),
    seo,
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    cover: mediaAsset,
    tags: z.array(z.string()).default([]),
    gallery: z.array(mediaAsset).default([]),
    video: videoAsset.optional(),
    related: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    seo: seo.optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    hero: hero.optional(),
    intro: z.string().optional(),
    features: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          image: mediaAsset,
          cta,
        })
      )
      .default([]),
    seo,
  }),
});

export const collections = { programs, waterEditions, news, pages };
