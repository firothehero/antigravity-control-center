import * as esbuild from 'esbuild';
import * as process from 'process';
import * as fs from 'fs';
import * as path from 'path';

const watch = process.argv.includes('--watch');
const production = process.argv.includes('--production');

const ctx = await esbuild.context({
  entryPoints: ['src/extension.ts'],
  bundle: true,
  outfile: 'dist/extension.js',
  external: ['vscode'],
  format: 'cjs',
  platform: 'node',
  target: 'node18',
  sourcemap: !production,
  minify: production,
  logLevel: 'info',
});

if (watch) {
  await ctx.watch();
} else {
  await ctx.rebuild();
  await ctx.dispose();
}

// Copy sql-wasm.wasm to dist/ (required by antigravity-sdk's StateBridge)
const wasmSrc = path.join('node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');
const wasmDst = path.join('dist', 'sql-wasm.wasm');
if (fs.existsSync(wasmSrc)) {
  fs.copyFileSync(wasmSrc, wasmDst);
  console.log(`Copied ${wasmSrc} → ${wasmDst}`);
}
