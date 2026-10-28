import { defineConfig } from "vitepress";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { KEYS, en, locales as languages, type Locale } from "./i18n.mts";

// The app repository (irooftop/rooftop): a sibling checkout, or the directory in ROOFTOP_SRC.
const app = process.env.ROOFTOP_SRC ? resolve(process.env.ROOFTOP_SRC) : fileURLToPath(new URL("../../../rooftop/", import.meta.url));

// The app version, straight from the crate manifest, for the nav badge.
const version = readFileSync(resolve(app, "Cargo.toml"), "utf8").match(/^version = "(.+)"/m)?.[1] ?? "";
const repo = "https://github.com/irooftop/rooftop";
const site = "https://github.com/irooftop/irooftop.github.io";

type UI = Record<(typeof KEYS)[number], string>;

// The interface strings of one language, checked against the English keys.
function ui(values: string[], where: string): UI {
  if (values.length !== KEYS.length) throw new Error(`${where}: ${values.length} strings, expected ${KEYS.length}`);
  return Object.fromEntries(KEYS.map((key, i) => [key, values[i]])) as UI;
}

// The theme settings that carry text: nav, sidebar, labels, search. Links stay the same in every language.
function chrome(t: UI) {
  return {
    nav: [
      { text: t.guide, link: "/guide/getting-started", activeMatch: "/guide/" },
      { text: t.features, link: "/features/how-it-works", activeMatch: "/features/" },
      { text: t.reference, link: "/reference/configuration", activeMatch: "/reference/" },
      {
        text: `v${version}`,
        items: [
          { text: t.releases, link: `${repo}/releases` },
          { text: t.changelog, link: `${repo}/releases/tag/v${version}` },
        ],
      },
    ],
    sidebar: [
      {
        text: t.guide,
        items: [
          { text: t.gettingStarted, link: "/guide/getting-started" },
          { text: t.offline, link: "/guide/offline" },
          { text: t.exportChat, link: "/guide/export" },
          { text: t.desktop, link: "/guide/desktop" },
          { text: t.unsigned, link: "/guide/unsigned-apps" },
          { text: t.docker, link: "/guide/docker" },
        ],
      },
      {
        text: t.features,
        items: [
          { text: t.howItWorks, link: "/features/how-it-works" },
          { text: t.shareLinks, link: "/features/share-links" },
          { text: t.telegram, link: "/features/telegram" },
          { text: t.media, link: "/features/media" },
          { text: t.mcp, link: "/features/mcp" },
        ],
      },
      {
        text: t.reference,
        items: [
          { text: t.configuration, link: "/reference/configuration" },
          { text: t.cli, link: "/reference/cli" },
          { text: t.httpApi, link: "/reference/http-api" },
          { text: t.relayHub, link: "/reference/relay-hub" },
          { text: t.development, link: "/reference/development" },
        ],
      },
    ],
    outline: { level: [2, 3], label: t.outline },
    lastUpdated: { text: t.lastUpdated },
    editLink: { pattern: `${site}/edit/main/docs/:path`, text: t.editLink },
    docFooter: { prev: t.prev, next: t.next },
    returnToTopLabel: t.backToTop,
    sidebarMenuLabel: t.menu,
    darkModeSwitchLabel: t.appearance,
    langMenuLabel: t.language,
    skipToContentLabel: t.skip,
    footer: { message: t.footerMessage, copyright: t.footerCopyright },
    search: {
      provider: "local",
      options: {
        translations: {
          button: { buttonText: t.searchButton, buttonAriaLabel: t.searchButton },
          modal: {
            noResultsText: t.searchNoResults,
            resetButtonTitle: t.searchClear,
            footer: { selectText: t.searchSelect, navigateText: t.searchNavigate, closeText: t.searchClose },
          },
        },
      },
    },
  };
}

// Each language is a folder of the same name: /es/, /zh-hans/, /ar/ … (its home page is docs/<dir>/index.md).
function locale(l: Locale) {
  const t = ui(l.ui, l.dir);
  return [
    l.dir,
    {
      label: l.label,
      lang: l.lang,
      dir: l.rtl ? "rtl" : "ltr",
      description: l.description,
      markdown: { codeCopyButton: { tooltipText: t.copyTooltip, copiedText: t.copied } },
      themeConfig: chrome(t),
    },
  ] as const;
}

export default defineConfig({
  title: "iRoof.top",
  description: en.description,
  lang: en.lang,
  base: "/",
  cleanUrls: true,
  lastUpdated: true,
  appearance: true,
  // Quiet, nearly monochrome code, like the rest of the page.
  markdown: { theme: { light: "min-light", dark: "min-dark" } },
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/img/favicon.svg" }],
    ["meta", { name: "theme-color", content: "#ffffff", media: "(prefers-color-scheme: light)" }],
    ["meta", { name: "theme-color", content: "#0b1016", media: "(prefers-color-scheme: dark)" }],
    ["meta", { property: "og:title", content: "iRoof.top" }],
    ["meta", { property: "og:description", content: "Talk to the people you miss: an LLM continues your Telegram or WhatsApp chat in their style." }],
  ],
  locales: {
    root: { label: en.label, lang: en.lang },
    ...Object.fromEntries(languages.map((l) => locale(l))),
  },
  themeConfig: {
    logo: { light: "/img/icon_light.svg", dark: "/img/icon_dark.svg", alt: "" },
    siteTitle: "iRoof.top",
    ...chrome(ui(en.ui, "root")),
    socialLinks: [{ icon: "github", link: repo }],
  },
});
