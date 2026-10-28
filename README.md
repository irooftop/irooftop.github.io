# irooftop.github.io

The public pages of [iRoof.top](https://iroof.top): the documentation and the splash page.

| Path | What | Where it is published |
|---|---|---|
| `docs/` | The documentation (VitePress, 21 languages) | [irooftop.github.io](https://irooftop.github.io), GitHub Pages (`docs.yml`) |
| `landing/` | The splash page of iroof.top (one HTML file per language, `sitemap.xml`) | `/srv/edge/iroof/site` on the server, served by Caddy |
| `scripts/` | `landing-i18n.py` writes the language pages and the sitemap; `landing-demo.py` inlines the demo | run locally |

The app itself lives in [irooftop/rooftop](https://github.com/irooftop/rooftop). The docs take its images and version
from there: check out `rooftop` next to this repository, or point `ROOFTOP_SRC` at it.

## Documentation

```sh
cd docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev     # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build   # docs/.vitepress/dist
```

Every push to `main` that touches `docs/` builds and deploys the site (`.github/workflows/docs.yml`).

## Splash page

Edit `landing/index.html` (the English page and the template), and the translations in `scripts/landing-i18n/*.json`.
Then regenerate everything:

```sh
python3 scripts/landing-i18n.py                       # every language page and sitemap.xml
ROOFTOP_SRC=../rooftop python3 scripts/landing-demo.py   # only after demo.svg changed in rooftop
```

`.github/workflows/landing.yml` fails when the generated pages are out of date. On push to `main` it copies `landing/`
to the server when the `VPS_*` secrets are set (see the comment at the top of the workflow). Without them, deploy by
hand: `rsync -rlt landing/ vps:/srv/edge/iroof/site/`.
