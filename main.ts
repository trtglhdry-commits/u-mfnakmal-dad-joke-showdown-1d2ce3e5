import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Dad Joke Showdown — one original dad joke, the whole entry.
// Judge brief (from the kit's RULES.txt): a father of three picks the joke
// that earns the bigger groan — a dad joke a father would tell at the
// table, a pun that lands cleanly on the first read, fresh rather than
// told a thousand times, tight with the punchline at the end, and natural
// read aloud. This joke turns the idiom "cold shoulder" on the one
// appliance in the house that is literally cold — the pun is the idiom
// itself, so it lands on first read with no setup to decode. It beats the
// rejected alternatives for the same reason: the lamp's "couldn't stay lit"
// is a soft pun with no idiom behind it, the washing machine's "spin a good
// yarn" leans on an idiom fewer listeners know, and "draw the steaks" is
// already circulating, so none of them is as fresh or as clean as a fridge
// giving everyone the cold shoulder.
const JOKE =
  "I told my kids the fridge is the coldest member of the family. It gives everyone the cold shoulder.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Own gate, mirroring the sealed scorer: UTF-8 text, 1-200 characters,
// not only white space. Fail loudly instead of handing in an invalid entry.
const chars = [...JOKE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`joke is ${chars} characters, outside the 1-200 gate`);
}
if (JOKE.trim().length === 0) {
  throw new Error("joke is only white space");
}
// Also reject leading/trailing white space or a trailing newline: the
// sealed scorer counts every character, so padding would silently eat
// budget and a stray newline would make the file differ from the joke.
if (JOKE !== JOKE.trim()) {
  throw new Error("joke has leading or trailing white space");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
