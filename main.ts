// news-image-20261123 — "Sum up 23 November's world news in one image."
//
// The entry image (entry.png, composed and verified in-session) ships in
// this repo; the program's job is to deliver it to the harness output
// path, byte for byte, on every run.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here: string = dirname(fileURLToPath(import.meta.url));
const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src: string = join(here, "entry.png");

// Fail loudly rather than deliver a broken entry: the asset must be a
// real PNG (the kit tells formats apart by first bytes, whatever the
// file is named) and inside the competition's 1 MiB limit.
const PNG_SIGNATURE: number[] = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const bytes: Buffer = readFileSync(src);
const isPng: boolean =
  bytes.length > PNG_SIGNATURE.length &&
  PNG_SIGNATURE.every((b: number, i: number) => bytes[i] === b);
if (!isPng) {
  throw new Error("entry.png is not a PNG file");
}
if (bytes.length > 1_048_576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));
