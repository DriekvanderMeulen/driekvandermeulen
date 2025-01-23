import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CONSTRUCTION: z.preprocess((str) => str === "true" || str === "false" ? str === "true" : str, z.boolean()),
    IS_VIDEO_PUBLIC: z.preprocess((str) => str === "true" || str === "false" ? str === "true" : str, z.boolean()),
    IS_FIGMA_PUBLIC: z.preprocess((str) => str === "true" || str === "false" ? str === "true" : str, z.boolean()),
  },
  client: {
    FIGMA_LINK: z.string(),
    VIDEO_LINK: z.string(),
  },
  runtimeEnv: {
    CONSTRUCTION: process.env.CONSTRUCTION,
    IS_VIDEO_PUBLIC: process.env.IS_VIDEO_PUBLIC,
    IS_FIGMA_PUBLIC: process.env.IS_FIGMA_PUBLIC,
    FIGMA_LINK: process.env.FIGMA_LINK,
    VIDEO_LINK: process.env.VIDEO_LINK,
  },
});