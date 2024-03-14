import { hfs } from "@humanfs/node";
import markdownIt from "markdown-it";
import Shiki from "@shikijs/markdown-it";
// import { codeToHtml } from 'shiki';
import { transformerTwoslash } from "@shikijs/twoslash";

// const md = markdownIt({
// 	highlight: codeToHtml(`console.log()`, {
// 		lang: 'ts',
// 		theme: 'vitesse-dark',
// 		transformers: [transformerTwoslash()]
// 	})
// });
const md = markdownIt();

md.use(
  await Shiki({
    themes: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
    transformers: [transformerTwoslash()],
  })
);

const readingPath = "./TS for OOPers.md";

const f = await hfs.text(readingPath);
const h = await md.render(f);

await hfs.write(`./md.html`, h);
