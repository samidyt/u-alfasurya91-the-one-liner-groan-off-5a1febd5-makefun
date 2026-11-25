// The One-Liner Groan-Off — make.fun bounty entry.
// Writes a single original dad joke (one line, <= 140 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const JOKE =
  "I told the bread a joke \u2014 it rose to the occasion, then crumbled under pressure.";

const OUT = "/output/entry.txt";

// Gate self-check: the sealed scorer only accepts UTF-8 text of 1-140
// characters, not only whitespace, on a single line. Fail loudly here
// rather than ever writing an invalid entry.
if (JOKE.length < 1 || JOKE.length > 140) {
  throw new Error(`joke is ${JOKE.length} chars, must be 1-140`);
}
if (JOKE.trim().length === 0 || /\r|\n/.test(JOKE)) {
  throw new Error("joke must be a single non-blank line");
}

// Write exactly the joke, no trailing newline: the ranking tie-break
// favours the smaller text, so not one byte is wasted.
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JOKE, "utf8");
console.log(`wrote ${JOKE.length}-char one-liner to ${OUT}`);
