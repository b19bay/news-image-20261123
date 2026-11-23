// news-image-20261123 — "Sum up 23 November's world news in one image."
//
// The entry image (entry.png, composed and verified in-session) ships in
// this repo; the program's job is to deliver it to the harness output
// path, byte for byte, on every run.

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here: string = dirname(fileURLToPath(import.meta.url));
const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, "entry.png"), join(outDir, "entry.png"));
