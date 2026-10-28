# Programowanie

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| Testy obejmują | |
|---|---|
| Parser i konwersję | na `examples/telegram` i `examples/whatsapp` |
| Linki udostępniania | izolację odwiedzających, blokadę PIN-u, listę dozwolonych mediów, pokoje, nazwy, blokowanie, obejście uwierzytelniania |
| Klient MCP | symulowane serwery każdej epoki protokołu (HTTP, przestarzały SSE, stdio) |
| Przekaźnik | hub, nazwy, przekazywanie |

Crate desktopowy jest osobny: `cd desktop && cargo check`.

## Układ

```
src/        serwer (axum), parsery, agent LLM, klient MCP, linki udostępniania, przekaźnik, Telegram
  server/     API HTTP właściciela, jeden plik na obszar: zasoby, wysyłanie, eksporty, czaty,
              wiadomości, ustawienia, media; mod.rs buduje routery
  share_api/  linki udostępniania: owner.rs (zarządzanie linkami i odwiedzającymi), visitor.rs (/s/…)
web/        interfejs: index.html, app.css i js/ (serwowany jako jeden app.js), wbudowany w plik binarny
  js/         jeden plik na obszar interfejsu, numerowany w kolejności ładowania (jeden skrypt, jeden zakres)
desktop/    aplikacja Tauri wokół tego samego serwera
deploy/     Caddy + Docker Compose
examples/   dwa zmyślone eksporty
```

Dokumentacja i strona startowa iroof.top nie znajdują się w tym repozytorium. Są w
[irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io): `docs/` (ta strona) i `landing/`.

## Dokumentacja

Dokumentacja jest w [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io). Pobiera obrazy
i wersję aplikacji z tego repozytorium: sklonuj oba obok siebie i buduj tam.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

Strona jest publikowana pod adresem [irooftop.github.io](https://irooftop.github.io) przy każdym pushu do `main` tego repozytorium, który zmienia `docs/`. `demo.svg` generuje `python3 scripts/demo-svg.py` w repozytorium aplikacji (czysty SVG i CSS, żeby GitHub go wyświetlał).

## Wydanie wersji

```
 podbij Cargo.toml ─▶ tag vX.Y.Z ─┬─▶ Release: crates.io + obraz ghcr.io (amd64 + arm64, natywne runnery)
                                  └─▶ desktop: instalatory ─▶ publikacja wydania (najnowsze) ─▶ Homebrew: formuła + cask
```

1. Podbij `version` w `Cargo.toml` (i w `desktop/`), zrób commit i wypchnij tag `vX.Y.Z`. Tag musi być numeryczny dla
   MSI na Windows. Wszystko poniżej uruchamia się bez dalszych kliknięć.
2. *Release* publikuje crate (sekret `CARGO_REGISTRY_TOKEN`, środowisko `crates-io`) i obraz Docker:
   jedno zadanie na architekturę na natywnym runnerze (`ubuntu-latest`, `ubuntu-24.04-arm`) wypycha przez digest, a zadanie
   `merge` tworzy tagi wieloarchitekturowe. Uruchom ręcznie z `dry_run`, żeby sprawdzić publikację crate'a.
3. *desktop* buduje instalatory dla macOS (arm64, x64), Windows i Linux w wydanie roboczym. Gdy wszystkie są
   dołączone, jego zadanie `publish` dodaje wygenerowane notatki o wydaniu, publikuje wydanie i oznacza je jako najnowsze.
4. Jego zadanie `homebrew` wywołuje potem *Homebrew*, który wysyła `Formula/rooftop.rb` i `Casks/irooftop.rb` do
   [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap). Wymaga sekretu `HOMEBREW_TAP_TOKEN`
   (token o wąskim zakresie, `irooftop/homebrew-tap`, Contents: odczyt i zapis) lub `HOMEBREW_TAP_DEPLOY_KEY`; bez żadnego
   pomija z ostrzeżeniem. (Wydanie opublikowane przez `GITHUB_TOKEN` nie uruchamia `release: published`, dlatego wywołanie jest jawne;
   publikacja wydania ręcznie nadal uruchamia Homebrew przez to zdarzenie.)

Aby ponownie uruchomić aktualizację taba dla istniejącego tagu, na przykład po dodaniu sekretu:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <kopia tapa>` generuje te same pliki lokalnie. Jeśli instalatory tagu się nie powiodły,
uruchom ponownie nieudane zadania *desktop*: `publish` i `homebrew` ruszą, gdy przejdą.
