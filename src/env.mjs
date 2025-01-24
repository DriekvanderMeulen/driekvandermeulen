import { z } from 'zod';

const envSchema = z.object({
  FIGMA_LINK: z.string(),
  VIDEO_LINK: z.string(),
});

export const env = envSchema.parse(process.env);