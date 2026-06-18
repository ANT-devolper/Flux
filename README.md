# Flux

Flux is a front-end-only MVP of a Kanban system, built with **pure HTML, CSS and
JavaScript** — no frameworks and no build step. Just open the pages in a browser.

## Screens

| Page            | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| `login.html`    | Login with email/password, Google and QR Code (decorative).        |
| `home.html`     | "Meus Kanban's" list and "Novos Templates".                        |
| `kanban.html`   | Board with columns Demanda / Teste / Deploy / Finalizado.          |
| `workflow.html` | Connected stage nodes (Demanda → Teste → Deploy → Finalizado).     |
| `config.html`   | Profile and appearance settings (toggles + color picker).          |

`index.html` redirects to the login screen. The navbar hamburger opens Config.

## Run

Open `index.html` (or any page) directly in a browser. There is no backend; all
data is mocked in `js/data.js` and is not persisted between reloads.

## Structure

- `css/base.css` — shared theme; one CSS file per page for specifics.
- `js/data.js` — mock data. `js/nav.js` — shared navbar behavior.
- `js/home.js`, `js/kanban.js`, `js/workflow.js`, `js/config.js` — per-page logic.
- `assets/logo.svg` — Flux flame logo.
