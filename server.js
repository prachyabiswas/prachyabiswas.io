/**
 * cPanel Node.js Selector entry point.
 *
 * Set "Application startup file" to `server.js` in cPanel. This hands off to
 * the standalone server produced by `npm run build:cpanel`. Passenger/cPanel
 * supplies PORT; the standalone Next server binds to it automatically.
 */
const fs = require('node:fs');
const path = require('node:path');

const standaloneServer = path.join(
  __dirname,
  '.next',
  'standalone',
  'server.js',
);

if (!fs.existsSync(standaloneServer)) {
  console.error(
    'Standalone build missing. Run `npm run build:cpanel` before starting the app.',
  );
  process.exit(1);
}

require(standaloneServer);
