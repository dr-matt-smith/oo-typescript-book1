// Turns a draft of slides in Markdown (slides separated by lines of ---) into a .story file for the
// Story Builder tool: one node per slide, in order, so the story's default sequence is the slide order.
// A quick way to start a deck; after that, the .story file is the deck, edited in the Story editor.
//
//   deno run -A tools/make_story.ts <draft.md> <out.story> "<story name>" ["<description>"]
//
// Each node is named after the slide's first heading (made unique). Images are referenced relative
// to the .story file, e.g. ![w:700](images/dev_loop.svg) with the image in an images/ folder beside it.
// Then build the PDF with:  deno run -A tools/story_pdf.ts <out.story>

const [draftPath, outPath, name = "", description = ""] = Deno.args;
if (!draftPath || !outPath) {
  console.error('usage: deno run -A tools/make_story.ts <draft.md> <out.story> "<name>" ["<description>"]');
  Deno.exit(1);
}

const draft = await Deno.readTextFile(draftPath);
const slides = draft.split(/^---\s*$/m).map((s) => s.trim()).filter((s) => s !== "");

const COLUMNS = 6;
const used = new Set<string>();
const nodes = slides.map((text, i) => {
  const heading = text.match(/^#{1,3}\s+(.+)$/m)?.[1].replace(/[*_`]/g, "").trim() ?? `Slide ${i + 1}`;
  let nodeName = i === 0 ? "Start" : heading;
  for (let n = 2; used.has(nodeName); n++) nodeName = `${heading} ${n}`;
  used.add(nodeName);
  return { name: nodeName, x: (i % COLUMNS) * 240, y: Math.floor(i / COLUMNS) * 140, text: text + "\n" };
});

const story = {
  name,
  description,
  navigation: { show: true, style: "arrows", position: "top-right", showNumber: true },
  sequenceArrows: { show: true, style: "dashed", color: "#ffcc00", alpha: 0.75 },
  nodes,
};
// Code wider than about 70 characters runs off the edge of a slide (in play mode and in the PDF).
const MAX_CODE_WIDTH = 70;
for (const node of nodes) {
  let inCode = false;
  for (const line of node.text.split("\n")) {
    if (line.startsWith("```")) inCode = !inCode;
    else if (inCode && line.length > MAX_CODE_WIDTH) {
      console.log(`warning: "${node.name}" has a ${line.length}-character code line: ${line.trim().slice(0, 50)}...`);
    }
  }
}

await Deno.writeTextFile(outPath, JSON.stringify(story, null, 2) + "\n");
console.log(`Wrote ${outPath}: ${nodes.length} slides`);
