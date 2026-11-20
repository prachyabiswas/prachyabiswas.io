import { access, cp, mkdir } from 'node:fs/promises';
import path from 'node:path';

/**
 * Finalises a standalone Next.js build for cPanel.
 *
 * Next.js traces dependencies into `.next/standalone`, but it does not copy
 * `public/` or `.next/static/` there. The standalone server expects both to
 * exist next to its own `server.js`, so copy them after every production
 * build. Run via `npm run build:cpanel`.
 */

const root = process.cwd();
const standaloneDir = path.join(root, '.next', 'standalone');
const publicDir = path.join(root, 'public');
const staticDir = path.join(root, '.next', 'static');

try {
  await access(standaloneDir);
} catch {
  console.error(
    'No standalone build found. Run `npm run build` (or `npm run build:cpanel`) first.',
  );
  process.exit(1);
}

await mkdir(path.join(standaloneDir, '.next'), { recursive: true });
await cp(staticDir, path.join(standaloneDir, '.next', 'static'), {
  recursive: true,
  force: true,
});
await cp(publicDir, path.join(standaloneDir, 'public'), {
  recursive: true,
  force: true,
});

console.log('cPanel standalone bundle ready at .next/standalone');
console.log('Startup file: server.js (or .next/standalone/server.js)');
