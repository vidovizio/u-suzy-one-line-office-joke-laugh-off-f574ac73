import { join, dirname } from "node:path";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const JOKE = "We don't have technical debt; we have a subscription to it.";

function writeJoke(outputDir: string): string {
  const outputPath = join(outputDir, "entry.txt");
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JOKE, "utf-8");
  return outputPath;
}

function verifyOutput(outputPath: string): number {
  const written = readFileSync(outputPath, "utf-8");
  if (written !== JOKE) {
    throw new Error("Output verification failed: content mismatch");
  }
  return written.length;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outputPath = writeJoke(outputDir);
  const charCount = verifyOutput(outputPath);
  console.error(`[self-check] Wrote ${charCount} characters to ${outputPath}`);
}

main();