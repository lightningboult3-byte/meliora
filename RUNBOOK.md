# Meliora — free weekly hosting (GitHub Pages + your Mac)

**No API. No paid anything.** The weekly Brief is written by the Claude scheduler that's
already part of your plan; your Mac quietly publishes it; GitHub hosts it free.

Repo: `https://github.com/lightningboult3-byte/meliora`

## How it works
1. **Friday 9:00 (Cowork scheduler, free):** the "meliora-weekly-brief" task researches the
   8 beats and rewrites **one file** — `~/Desktop/Art/meliora/data/brief.js`. Nothing else.
2. **Friday 10:00 (your Mac, free):** a tiny `launchd` job runs `push-meliora.command`, which
   `git push`es the folder **only if brief.js changed**. (If the Mac is asleep at 10:00, it
   runs at the next wake-up.)
3. **GitHub Pages (free):** serves the `main` branch directly, so the push republishes the
   site automatically. No build, no Actions, no secrets.

**Cost: $0.** The only requirement: your Mac is on sometime Friday so it can push.

---

## One-time setup (~20–30 min)

> Do everything from the **unzipped `meliora` folder placed at `~/Desktop/Art/meliora`**.
> First, in Finder, open `~/Desktop/Art/meliora` and **delete anything already in it**
> (old stray files), then copy in the freshly unzipped contents so it contains `index.html`,
> `assets/`, `data/`, `mac-setup/`, `.nojekyll`, etc.

### A. Push the files to GitHub (Terminal)
You'll need a **GitHub token** as the password: GitHub → Settings → Developer settings →
Personal access tokens → **Fine-grained token** → repo access = `meliora`, permission
**Contents: Read and write** → generate → copy.

```bash
cd ~/Desktop/Art/meliora
git init -b main
git remote add origin https://github.com/lightningboult3-byte/meliora.git
git add -A
git commit -m "Meliora: initial site"
git push -u origin main      # Username = lightningboult3-byte ; Password = the token
```
(If `git: command not found`, run `xcode-select --install` first, then re-run.)

### B. Turn on GitHub Pages
Repo → **Settings → Pages → Build and deployment → Source: "Deploy from a branch"** →
Branch: **main**, folder: **/ (root)** → Save. After a minute your URL appears:
`https://lightningboult3-byte.github.io/meliora/`. Open it to confirm the site is live.

### C. Prime the Mac publisher (do this once, it saves your login)
```bash
chmod +x ~/Desktop/Art/meliora/mac-setup/push-meliora.command
~/Desktop/Art/meliora/mac-setup/push-meliora.command
```
It should print "No changes to publish" (nothing changed yet) **without asking for a
password** — that proves your GitHub login is cached for the automatic job. If it asks for a
password, paste the token once; it'll be remembered after that.

### D. Install the weekly auto-push (launchd)
```bash
cp ~/Desktop/Art/meliora/mac-setup/com.meliora.autopush.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.meliora.autopush.plist
```
That's it — every Friday 10:00 it publishes any change. (Logs go to `/tmp/meliora-push.log`.)

### E. Switch on the weekly Brief writer
The Cowork scheduled task **"meliora-weekly-brief"** is already enabled (Fridays 9:00).
Open it and click **Run now once** — this pre-approves the tools it needs (web search + file
editing) so future Friday runs don't pause waiting for permission. After it finishes, check
that `~/Desktop/Art/meliora/data/brief.js` shows a new issue number/date. Then run step C's
command again — it should push, and your live site should show the new Brief.

---

## The one thing to confirm on the first real run
The single link I can't test ahead of time is whether the **scheduled** Cowork run can write
into your `~/Desktop/Art/meliora` folder (unattended runs and your live folder don't always
share the same view). The **Run now** in step E is the proof:
- If `data/brief.js` updates on your Mac → everything works; you're fully hands-off.
- If it does **not** update → tell me. The clean fallback is the **feeds** option (a GitHub
  job pulls RSS feeds — fully cloud, still $0), which doesn't depend on the folder at all.

## If something's off
- **Site not updating but brief.js changed locally:** run `push-meliora.command` by hand and
  read what it prints; check `/tmp/meliora-push.err`.
- **Push asks for a password every time:** run step C once from Terminal so macOS caches the
  token in Keychain.
- **Pages shows nothing:** re-check Settings → Pages is "Deploy from a branch → main → /root",
  and that `.nojekyll` is present (it is, in the zip).

## Editing the design or fixed content
Everything except the Brief is in `data/content.js`, `assets/`, `index.html`. Edit in
`~/Desktop/Art/meliora`, then:
```bash
cd ~/Desktop/Art/meliora && git add -A && git commit -m "update" && git push
```
