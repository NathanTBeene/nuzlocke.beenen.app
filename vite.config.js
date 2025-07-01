// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite'

import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer'
import { plugin as markdown } from 'vite-plugin-markdown'

import fs from 'fs';

/** @type {import('vite').Plugin} */
const base64Loader = {
  name: 'base64-loader',
  transform(code, id) {
    const [path, query] = id.split('?');
    if (query != 'base64')
      return null;

    const data = fs.readFileSync(path);

    return `export default '${data.toString('base64')}'`;
  }
};


/** @type {import('vite').UserConfig} */
const config = {
  plugins: [visualizer(), markdown({ mode: ['html'] }), base64Loader, sveltekit()],
  resolve: {
    alias: {
      $docs: path.resolve('./src/docs'),
      $c: path.resolve('./src/lib/components'),
      $utils: path.resolve('./src/lib/utils'),
      $data: path.resolve('./src/lib/data'),
      $store: path.resolve('./src/lib/store.js'),
      $icons: path.resolve('./src/lib/components/icons/IconSet.ts')
    }
  },

  build: {
    sourcemap: true,
    target: ['es2020']
  }
};

export default config;
