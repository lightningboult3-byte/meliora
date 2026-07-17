# Meliora — MEL team hub

An internal development hub for the MEL team. A single static site, no framework, no backend.
"Ever better" — explore the field, see where your craft can go, stay current.

It has four regions, hash-routed:

- **Map** (`#/map`) — the home: a journey of four photo-backed "stops."
- **The Brief** (`#/news`) — the weekly brief; the one fast-moving region (auto-updates).
- **The Path** (`#/skills`) — a competency map (2018 AEA Evaluator Competencies + a Data & Technology domain) × four levels, with "what good looks like" and "learn next."
- **The Field** (`#/gateway`) — the gateway outward: orgs, communities, plus two **trend reports** (Career, and Social Development & Education) that open sub-pages at `#/field/career` and `#/field/education`.

Visual language: **brutalist-editorial** — heavy display type and clear structure on a calm paper ground, with the four region images as full-bleed backgrounds. Fully responsive (portrait, landscape, tablet, desktop).

---

## Repo structure

```
meliora/
├─ index.html              # shell + all regions (hash routing)
├─ .gitlab-ci.yml          # GitLab Pages deploy job
├─ .nojekyll               # tells GitHub Pages to serve files as-is
├─ assets/
│  ├─ styles.css           # the whole look (one file)
│  ├─ app.js               # routing + renders everything from window.HUB
│  └─ img/                 # region backgrounds: brief.jpg, path.jpg, field.jpg, milestones.jpg
├─ data/
│  └─ content.js           # << THE ONLY FILE CONTENT LIVES IN >> (sets window.HUB)
├─ scripts/
│  └─ update-brief.md       # spec the weekly job follows to refresh The Brief
└─ README.md
```

**The point:** `app.js` never hard-codes content. To change what the site says, edit `data/content.js`. Presentation and data never tangle — which is what makes the weekly auto-update painless.

---

## Run it locally

Double-click `index.html` (everything loads from relative paths). For clean routing, serve it:

```bash
cd meliora
python3 -m http.server 8080   # then open http://localhost:8080
```

---

## Host it (this is the part you want)

The site is fully static, so any static host works. **Relative paths only** are used, so it runs fine from a subpath like `you.gitlab.io/meliora/`.

### GitLab Pages — recommended for a *private* internal tool
GitLab can keep Pages **members-only** on the free tier. The included `.gitlab-ci.yml` publishes automatically on every push to `main`. After your first push:
**Project → Settings → Pages**, and set visibility to **"Only project members."**

### GitHub Pages
**Repo → Settings → Pages → Source: "Deploy from a branch" → `main` / `/ (root)`.** Live in ~1 min.
Note: serving Pages from a **private** GitHub repo needs a paid plan (Pro/Team/Enterprise). On the free tier the repo must be public for Pages to serve. If it must stay private and free, use GitLab.

(Full click-by-click steps are in the chat where this was set up.)

---

## Keeping The Brief fresh (the weekly update)

The Brief renders from the `brief` object inside `data/content.js`. To refresh it, that object gets regenerated and the repo is pushed — Pages redeploys automatically.

- **Spec:** `scripts/update-brief.md` defines exactly what to research and the shape to write back.
- **Automated:** a weekly Cowork task ("meliora-weekly-brief", Fridays 9am) runs that spec, rewrites the `brief` object, bumps the issue number + date, and pushes — **provided this repo lives in a connected folder with `git push` configured.** Until then it prepares the update for you to push.
- **Manual:** open `scripts/update-brief.md`, run it, commit, push.

The other regions move at their own pace — edit `domains` / `gateway` / `fieldTrends` in `content.js` by hand (frameworks, not news).

---

## Swapping the artwork

Region backgrounds live in `assets/img/` as `brief.jpg`, `path.jpg`, `field.jpg`, `milestones.jpg`.
Replace any file (keep the name) and it shows on next load. Portrait, roughly phone-ratio images work best.
**Only use art you own or that's genuinely free** (your Canva exports, Pixabay / Unsplash / CC0). Don't host signed or ©-marked work.

---

## Design decisions (so future-you doesn't undo them)

- **Brutalist-editorial:** bold display type + structure (the bones) on a calm paper ground with thin keylines and breathing room (the skin). Images carry atmosphere. Don't reintroduce loud grids or chunky shadows — that was the earlier draft and it fought the photography.
- **Skills spine is real:** [2018 AEA Evaluator Competencies](https://www.eval.org/About/Competencies-Standards) + an added Data & Technology domain. Swap in UNEG/CES if you prefer.
- **The Brief is the only thing that should change weekly.** Everything else is stable on purpose.
- **No backend yet.** Self-assessment / progress tracking (the locked "Milestones" tower) is the future phase where a database (e.g. Airtable synced at build time) earns its place.
