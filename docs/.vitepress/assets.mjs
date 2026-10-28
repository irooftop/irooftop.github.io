// Copies the images shared with the app into docs/public/img, and the app's scene into
// theme/scene.svg (both git-ignored), so there is a single source for each of them: the app
// repository (irooftop/rooftop), a sibling checkout, or the directory in ROOFTOP_SRC.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const app = process.env.ROOFTOP_SRC ? resolve(process.env.ROOFTOP_SRC) : fileURLToPath(new URL("../../../rooftop/", import.meta.url));
const root = pathToFileURL(app + "/");
const out = new URL("../public/img/", import.meta.url);
mkdirSync(out, { recursive: true });
for (const f of ["demo.svg", "web/telegram-export.svg", "web/favicon.svg", "web/icon_light.svg", "web/icon_dark.svg", "web/logo_light.svg", "web/logo_dark.svg"]) {
  copyFileSync(new URL(f, root), new URL(f.split("/").pop(), out));
}

// The scene of the app's home screen (and of iroof.top) for the docs' home page.
const html = readFileSync(new URL("web/index.html", root), "utf8");
const scene = html.match(/<svg class="scene"[\s\S]*?<\/svg>/)?.[0];
if (!scene) throw new Error("web/index.html: no <svg class=\"scene\"> found");
writeFileSync(new URL("theme/scene.svg", import.meta.url), scene.replace('class="scene"', 'class="scene" aria-hidden="true" focusable="false"') + "\n");
