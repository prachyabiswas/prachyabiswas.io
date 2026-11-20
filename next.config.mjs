/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Produces .next/standalone with only the traced dependencies needed by
  // cPanel's Node.js Selector (plus node_modules). `npm run build:cpanel`
  // copies public/ and .next/static/ into it so the standalone server can
  // serve assets correctly.
  output: 'standalone',
};

export default nextConfig;
