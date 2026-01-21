// @ts-check
import { defineConfig } from 'astro/config';
import rehypeSlug from 'rehype-slug';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-site.com', // Update with your site URL
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx({
      rehypePlugins: [rehypeSlug],
    })
  ],
  markdown: {
    rehypePlugins: [rehypeSlug],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});