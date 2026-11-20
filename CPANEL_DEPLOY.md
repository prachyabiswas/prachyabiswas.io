# Deploying to cPanel (Node.js Selector)

This portfolio runs on cPanel as a standalone Next.js app. The Node.js app
lives outside `public_html`; Apache in `public_html` only proxies requests to
it. No Vercel account is required.

## Files added for cPanel

| File | Purpose |
| --- | --- |
| `next.config.mjs` | Enables `output: 'standalone'`. |
| `scripts/cpanel-build.mjs` | Copies `public/` and `.next/static/` into `.next/standalone/` after the build. |
| `server.js` | cPanel startup file; boots the standalone Next server on the port Passenger provides. |
| `.htaccess.cpanel.example` | Apache reverse-proxy rules for the domain document root. |
| `.env.example` | Environment variables to set in cPanel before building. |

## One-time setup

1. **Confirm Node.js Selector is available** in your cPanel account. Use Node
   **22.x** (18.18+ also works). Point the domain or subdomain at this cPanel
   account.

2. **Upload the project outside `public_html`**, for example to `~/portfolio`.
   Do not upload `node_modules` or `.next`; they are generated on the server.
   You can use Git, File Manager, or SSH:

   ```bash
   cd ~
   git clone <your-repo-url> portfolio
   cd portfolio
   ```

3. **Set environment variables in cPanel** before building. In
   **Node.js Selector → your app → Environment Variables**, add:

   ```text
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
   CONTACT_TO_EMAIL=you@your-domain.com
   ```

   `NEXT_PUBLIC_SITE_URL` is inlined at build time, so it must be set **before**
   running the build.

4. **Install and build** using cPanel Terminal or SSH:

   ```bash
   cd ~/portfolio
   npm ci
   npm run build:cpanel
   ```

   `build:cpanel` runs `next build` and then prepares the standalone bundle.
   Using plain `npm run build` will produce pages without CSS/JS/images in
   standalone mode.

5. **Create the Node.js app** in cPanel → **Node.js Selector**:

   | Setting | Value |
   | --- | --- |
   | Node.js version | 22.x |
   | Application root | `portfolio` (or `/home/USERNAME/portfolio`) |
   | Application URL | your domain/subdomain |
   | Application startup file | `server.js` |
   | Passenger log file | `portfolio.log` (any writable name) |

   Click **Create**, then **Restart**.

6. **Install the Apache proxy rules.** Copy `.htaccess.cpanel.example` to your
   domain document root as `.htaccess` and replace `__PORT__` with the port
   cPanel shows for the Node.js app (often `3000`):

   ```apache
   RewriteEngine On
   RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L,QSA]
   ```

   If cPanel already generated an `.htaccess` for the Node app, use that file
   and only verify the port is correct.

7. **Verify** in a browser:
   - `https://your-domain.com/` loads with styling, fonts and the portrait.
   - `https://your-domain.com/talks/machine-learning-2026-ai-seminar` works as
     a direct link (no 404).
   - The theme toggle and seminar gallery lightbox work.
   - The contact form returns success only after Resend is configured.

## Updating the site

```bash
cd ~/portfolio
git pull
npm ci                 # only if package-lock.json changed
npm run build:cpanel
```

Then click **Restart** in Node.js Selector. If the port changes, update
`public_html/.htaccess`. Server-only env changes need only a restart; changes
to `NEXT_PUBLIC_SITE_URL` need a rebuild.

## Auto-deploy from GitHub (no SSH required)

The GitHub repo is `https://github.com/Dumbo-programmer/Prachya-Portfolio`
(default branch `main`). First **commit and push your current work** — GitHub
can only build what is on GitHub.

This setup avoids SSH entirely:

- GitHub Actions builds the standalone bundle on a GitHub runner.
- It commits the built files to a `deploy` branch.
- cPanel Git Version Control pulls that branch over HTTPS.
- A cPanel cron job fast-forwards the checkout and restarts the app.

No `npm ci`, `npm run build` or `next dev` ever runs on cPanel.

### One-time setup

1. **Add one GitHub secret.** In GitHub → **Settings → Secrets and variables →
   Actions → New repository secret**:

   | Secret | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://prachyabiswas.com` |

   The workflow uses the built-in `GITHUB_TOKEN` to push the `deploy` branch.
   No SSH keys, hostnames or passwords are needed.

2. **Push to `main`.** The Actions tab will show the workflow building the app
   and pushing to `deploy`. Wait for it to finish once so the branch exists.

3. **Clone the repo in cPanel.** In **cPanel → Files → Git Version Control**,
   click **Create**, enable **Clone a Repository**, and use:

   ```text
   https://github.com/Dumbo-programmer/Prachya-Portfolio.git
   ```

   Repository path: `portfolio` (or your preferred directory outside
   `public_html`).

4. **Switch the checkout to the `deploy` branch.** In the repository **Manage**
   screen, set **Checked-Out Branch** to `deploy`, then click **Update** /
   **Update from Remote**. The directory now contains the prebuilt standalone
   app with `server.js`, `public/` and `.next/static/` at its root.

5. **Create the Node.js app** in cPanel:
   - Application root: the directory from step 3.
   - Application startup file: `server.js`
   - Node version: 22.x
   - Passenger log file: `portfolio.log`

6. **Set runtime env vars** in **Node.js Selector → Environment Variables**:

   ```text
   RESEND_API_KEY=...
   CONTACT_TO_EMAIL=...
   NEXT_PUBLIC_SITE_URL=https://prachyabiswas.com
   ```

   `NEXT_PUBLIC_SITE_URL` is baked into the build by the GitHub secret, but
   keeping it here is harmless. Resend values are read at runtime only.

7. **Install the Apache proxy** as described earlier: copy
   `.htaccess.cpanel.example` to `public_html/.htaccess` and set the port
   cPanel assigned.

8. **Add the autopull cron job** in **cPanel → Advanced → Cron Jobs**, every 5
   minutes:

   ```cron
   */5 * * * * /bin/bash /home/USERNAME/repositories/Prachya-Portfolio/scripts/cpanel-cron-pull.sh >> /home/USERNAME/repositories/Prachya-Portfolio/cron-pull.log 2>&1
   ```

   Replace `/home/USERNAME/repositories/Prachya-Portfolio` with your actual
   repository path. The script is included in the `deploy` branch by the
   workflow. It pulls GitHub, restarts only when the commit changed, and logs
   to `cron-pull.log`.

After this, every push to `main` becomes live within about 5 minutes. You can
also click **Update from Remote** in cPanel Git Version Control to pull sooner.

### Manual upload of the built site

If you prefer to upload files yourself, do **not** run `npm run build` on
Windows and upload the result. The standalone bundle contains platform-specific
`node_modules` (for example `sharp`), so it must be built on Linux.

Use the GitHub Actions artifact instead:

1. Push to `main` and wait for the Actions run to finish.
2. Open the repo's **Releases** page. The latest **cPanel standalone build**
   release has `cpanel-standalone.tar.gz` attached. (The same file is also an
   Actions artifact named `cpanel-standalone`, but artifacts expire after 14
   days; the Release does not.)
3. In cPanel File Manager, go to the app directory outside `public_html`.
4. Upload `cpanel-standalone.tar.gz` there and extract it so these exist at the
   top level: `server.js`, `public/`, `.next/`.
5. Click **Restart** in Node.js Selector.

This is a fully manual alternative to the `deploy` branch. Set
`NEXT_PUBLIC_SITE_URL` as a GitHub secret before the build, and keep Resend
variables in Node.js Selector at runtime.

Plain `npm run build` is not enough for this: use `npm run build:cpanel`, which
copies `public/` and `.next/static/` into the standalone bundle. A plain static
export (`out/`) also will not work because the site has an API route and
dynamic metadata routes.

### Manual fallback with no cron

If your host does not allow cron jobs, just click **Update from Remote** in
cPanel Git Version Control after each successful Actions run, then click
**Restart** in Node.js Selector.

### Restart note

`touch tmp/restart.txt` in `scripts/cpanel-cron-pull.sh` is Passenger's restart
signal and normally restarts a cPanel Node.js app. If your host does not react
to it, click **Restart** in **Node.js Selector** or ask the host which restart
hook they support.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| 502 / 503 Bad Gateway | Wrong port in `.htaccess`, app not restarted, or startup file not `server.js`. |
| `WebAssembly.instantiate(): Out of memory` | You are running `npm run dev` / `next dev` on cPanel, or building inside the LVE. Never build or run dev mode on the server. Let GitHub Actions build the `deploy` branch. |
| Workflow cannot push `deploy` branch | Ensure `permissions: contents: write` is in the workflow and that the repo's Actions settings allow read/write permissions. |
| cPanel shows old content after Actions succeeds | Run the autopull cron script or click **Update from Remote** in Git Version Control, then restart the Node app. |
| Page loads but no CSS/JS | The checkout is not on the `deploy` branch, or the build bundle is incomplete. Re-run the workflow and pull again. |
| Broken portraits / seminar photos | `public/` was not copied — rerun `npm run build:cpanel`. |
| Contact form says email is unavailable | Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`, restart the app. |
| Wrong canonical URL / OG links | Set `NEXT_PUBLIC_SITE_URL` before rebuilding. |
| 404 on direct article links | Apache is not proxying all requests; check `.htaccess` rewrite rule. |

## Notes

- Keep the application root outside `public_html` so source files, `.env` and
  `.next` are not downloadable.
- Enable SSL in cPanel and force HTTPS; set `NEXT_PUBLIC_SITE_URL` to the final
  HTTPS domain.
- The generated `sitemap.xml` and `robots.txt` are served by Next.js through
  the proxy; submit `https://your-domain.com/sitemap.xml` to Search Console.
