import { build } from 'esbuild';

build({
  entryPoints: ['src/index.js'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/index.js',
  banner: { js: '#!/usr/bin/env node' },
  external: ['yargs', 'yargs/yargs', 'yargs/helpers', 'inquirer', 'child_process', 'path'],
  minify: true,
  sourcemap: false
}).catch(() => process.exit(1));
