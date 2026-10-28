# Hub relais

Un serveur peut être le relais que les applications utilisent pour le partage **Internet**, comme l'est iroof.top.

```
 visiteur ──▶ https://alex.votre.domaine/s/… ──▶ hub ══ WebSocket ══▶ application d'Alex
                                              │
 application ── POST /relay/v1/register {name} ─▶│  noms : premier arrivé, premier servi
 application ── GET  /relay/v1/connect ════════▶│  une connexion sortante par application
```

| Côté | Réglage |
|---|---|
| Hub | `ROOFTOP_RELAY_DOMAIN=votre.domaine` (bot partagé facultatif : `ROOFTOP_RELAY_BOT_TOKEN`) |
| Applications | `ROOFTOP_RELAY_URL=https://votre.domaine` : liens sur `https://<nom>.votre.domaine` |

## Prérequis

* Un enregistrement DNS joker `*.votre.domaine` pointant vers le serveur.
* Un certificat joker. Avec Caddy, il faut le défi DNS-01 et un
  [module de fournisseur DNS](https://caddyserver.com/docs/modules/) (`xcaddy build --with github.com/caddy-dns/<fournisseur>`).
* Un proxy inverse qui transmet `Host` (Caddy le fait par défaut) :

```nginx
*.votre.domaine {
	tls {
		dns <fournisseur> …
	}
	reverse_proxy iroof:8080
}
```

## Une page d'accueil sur le domaine principal {#a-splash-page-on-the-main-domain}

Sur le domaine principal, le hub sert l'API du relais, ses propres liens de partage et l'application du propriétaire (derrière `ROOFTOP_PASSWORD`).
iroof.top affiche à la place une petite page d'accueil à `/`, avec des liens vers la documentation et GitHub, en anglais et dans 20 autres langues
(`/es/`, `/zh-hans/`, `/ja/`, …; la liste figure sur chaque page, et `sitemap.xml` les répertorie avec leurs alternatives hreflang).
[`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) est la page anglaise ;
`python3 scripts/landing-i18n.py` génère les autres à partir d'elle, avec les traductions de `scripts/landing-i18n/`. Chaque page est un
seul fichier autonome (pas de scripts, de polices ni de requêtes tierces) ; les questions sont des éléments `<details>` natifs.
Les liens `<nom>.votre.domaine` inconnus aboutissent aussi ici. La démo de l'application qui s'y trouve est [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg),
intégrée comme image `data:` par `python3 scripts/landing-demo.py` (à relancer après une modification de `demo.svg`, puis `scripts/landing-i18n.py`).
Montez le dossier dans Caddy (`./landing:/srv/landing:ro`) et routez `/`, les dossiers de langues et `sitemap.xml` :

```nginx
votre.domaine {
	# Visiteurs : la page d'accueil. Un navigateur qui envoie déjà le mot de passe du propriétaire obtient l'application.
	@landing {
		method GET HEAD
		path / /index.html
		not header Authorization *
	}
	handle @landing {
		root * /srv/landing
		rewrite * /index.html
		header Content-Security-Policy "default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
		file_server
	}
	# Les autres langues : /es/, /zh-hans/, … (les dossiers écrits par scripts/landing-i18n.py).
	@languages {
		method GET HEAD
		path_regexp lang ^/(es|zh-hans|hi|ar|fr|bn|pt-br|ru|ur|id|de|ja|tr|ko|vi|it|pl|uk|nl|fa)(/|/index\.html)?$
		not header Authorization *
	}
	handle @languages {
		root * /srv/landing
		header Content-Security-Policy "default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
		file_server
	}
	handle /sitemap.xml {
		root * /srv/landing
		file_server
	}
	# Le propriétaire se connecte sur /owner : le navigateur demande le mot de passe, le renvoie, et / ouvre l'application.
	handle /owner {
		@anon not header Authorization *
		handle @anon {
			header WWW-Authenticate "Basic realm=\"iRoof.top\""
			respond "Sign in to open the app" 401
		}
		handle {
			redir * / 302
		}
	}
	handle {
		reverse_proxy iroof:8080
	}
}
```

L'application vérifie toujours le mot de passe à chaque requête du propriétaire ; le filtre décide seulement qui voit la page d'accueil.

## Règles

| | |
|---|---|
| API du hub | `/relay/v1/…` sur le domaine principal |
| `<nom>.votre.domaine` | va toujours à l'application qui possède le nom, jamais à l'interface propriétaire du hub |
| Noms | 3 à 32 lettres minuscules, chiffres et tirets ; quelques-uns (`www`, `api`, `admin`…) sont réservés |
| Libération | après 180 jours sans connexion |
| Nouveaux noms | limités en débit par IP |
| Propriété | un secret aléatoire dans le `settings.json` de l'application ; le hub ne stocke que son SHA-256 |
| État | `relay.json` et `relay-telegram.json` dans le dossier de données |
