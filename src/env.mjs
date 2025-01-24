import { z } from 'zod';

const envSchema = z.object({
  FIGMA_LINK: z.string().url(),
  VIDEO_LINK: z.string().url(),
});

export const env = envSchema.parse(process.env);