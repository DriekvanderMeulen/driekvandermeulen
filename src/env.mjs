import { z } from 'zod';

const envSchema = z.object({
  FIGMA_LINK: z.string().url(),
  VIDEO_LINK: z.string().url(),
  CONSTRUCTION: z.preprocess((val) => val === 'true', z.boolean().optional()),
  IS_VIDEO_PUBLIC: z.preprocess((val) => val === 'true', z.boolean().optional()),
  IS_FIGMA_PUBLIC: z.preprocess((val) => val === 'true', z.boolean().optional()),
});

export const env = envSchema.parse(process.env);