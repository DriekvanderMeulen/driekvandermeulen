import { z } from 'zod';

const envSchema = z.object({
  FIGMA_LINK: z.string().url(),
  VIDEO_LINK: z.string().url(),
  CONSTRUCTION: z.boolean().optional(),
  IS_VIDEO_PUBLIC: z.boolean().optional(),
  IS_FIGMA_PUBLIC: z.boolean().optional(),
});

export const env = envSchema.parse(process.env);