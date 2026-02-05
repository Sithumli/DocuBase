import { defineConfig } from 'astro/config';
import rehypeSlug from 'rehype-slug';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://docubase-docs.vercel.app',
  output: 'static',
  srcDir: './template/src',
  publicDir: './template/public',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './template/src'),
        '@/components': path.resolve(__dirname, './template/src/components'),
        '@/types': path.resolve(__dirname, './template/src/types'),
        '@/utils': path.resolve(__dirname, './template/src/utils'),
        '@/styles': path.resolve(__dirname, './template/src/styles'),
      },
    },
  },
  integrations: [
    mdx({
      rehypePlugins: [rehypeSlug],
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeSlug],
  },
});