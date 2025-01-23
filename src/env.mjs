import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    CONSTRUCTION: z.preprocess((str) => str === "true" || str === "false" ? str === "true" : str, z.boolean()),
    PUBLIC_VIDEO: z.preprocess((str) => str === "true" || str === "false" ? str === "true" : str, z.boolean()),
    PUBLIC_FIGMA: z.preprocess((str) => str === "true" || str === "false" ? str === "true" : str, z.boolean()),
  },
  client: {
    FIGMA_LINK: z.string(),
    VIDEO_LINK: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    CONSTRUCTION: process.env.CONSTRUCTION,
    PUBLIC_VIDEO: process.env.PUBLIC_VIDEO,
    PUBLIC_FIGMA: process.env.PUBLIC_REPORT,
    FIGMA_LINK: process.env.FIGMA_LINK,
    VIDEO_LINK: process.env.VIDEO_LINK,
  },
});