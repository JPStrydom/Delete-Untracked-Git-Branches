const { build } = require('esbuild');

build({
  entryPoints: ['index.js'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/index.js',
  banner: { js: '#!/usr/bin/env node' },
  external: ['yargs'],
  minify: true,
  sourcemap: false
}).catch(() => process.exit(1));
