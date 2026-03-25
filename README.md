# DocuBase

A general-purpose documentation template for web projects. Framework-agnostic, content-first, and ready to deploy.

**Live Demo:** [https://docubase-docs.vercel.app](https://docubase-docs.vercel.app)

## Quick Start

The fastest way to create a new DocuBase documentation site:

```bash
npx create-docubase my-docs
cd my-docs
npm run dev
```

Your site will be available at `http://localhost:4321`.

## Features

- **Content-First**: Write documentation in MDX with full component support
- **Framework-Agnostic**: Works with any UI library or none at all
- **Multiple Content Types**: Documentation, blog posts, and tutorials out of the box
- **AI Chat Assistant**: Built-in RAG-powered chat that answers questions about your docs
- **Static Site Generation**: Fast, SEO-friendly pages that deploy anywhere
- **Type-Safe**: Full TypeScript support with Astro Content Collections
- **Dark Mode**: Automatic dark mode support via CSS media queries

## Tech Stack

- [Astro](https://astro.build/) - Static site framework
- [MDX](https://mdxjs.com/) - Markdown with components
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Google Gemini](https://ai.google.dev/) - AI chat responses
- [Upstash Vector](https://upstash.com/vector) - Vector search for RAG
- [Storybook](https://storybook.js.org/) - Component playground (optional)

## Installation

### Prerequisites

- Node.js 18 or higher

### Using npx (Recommended)

Run the CLI directly without installing:

```bash
npx create-docubase my-docs
```

The CLI will:
1. Create a new directory with your project name
2. Copy the DocuBase template files
3. Prompt you to install dependencies
4. Provide next steps to get started

### Using npm global install

Install the CLI globally for repeated use:

```bash
npm install -g create-docubase
create-docubase my-docs
```

### Using pnpm

```bash
pnpm create docubase my-docs
```

### Using yarn

```bash
yarn create docubase my-docs
```

### Manual Clone (Alternative)

You can also clone the template directly:

```bash
git clone https://github.com/Sithumli/DocuBase.git my-docs
cd my-docs

# Install dependencies
npm install

# Start development server
npm run dev
```

Your site will be available at `http://localhost:4321`.

## Project Structure

```
src/
├── content/
│   ├── docs/           # Documentation pages
│   ├── blog/           # Blog posts
│   └── tutorials/      # Tutorials and guides
│
├── layouts/
│   └── DocsLayout.astro
│
├── components/         # Reusable, framework-agnostic components
│   ├── Callout.astro
│   ├── CodeGroup.astro
│   ├── Collapsible.astro
│   ├── Example.astro
│   ├── Step.astro
│   ├── Steps.astro
│   └── Tabs.astro
│
├── pages/
│   ├── index.astro
│   ├── docs/
│   ├── blog/
│   └── tutorials/
│
├── stories/            # Storybook stories (optional)
└── styles/
    └── global.css

.storybook/             # Storybook configuration (optional)
astro.config.mjs
package.json
```

## Content Types

### Documentation

Create documentation pages in `src/content/docs/`:

```mdx
---
title: Page Title
description: Brief description
order: 1
category: Getting Started
draft: false
---

Your content here...
```

### Blog Posts

Add blog posts to `src/content/blog/`:

```mdx
---
title: Post Title
description: Post description
pubDate: 2024-01-15
author: Author Name
tags: [tag1, tag2]
draft: false
image: /images/post-image.jpg
---

Post content here...
```

### Tutorials

Create tutorials in `src/content/tutorials/`:

```mdx
---
title: Tutorial Title
description: What you'll learn
difficulty: beginner | intermediate | advanced
duration: 30 minutes
prerequisites:
  - Prerequisite 1
  - Prerequisite 2
tags: [tag1, tag2]
order: 1
draft: false
---

Tutorial content here...
```

## Components

DocuBase includes several built-in components for MDX:

### Callout

```mdx
import Callout from '../../components/Callout.astro';

<Callout type="note">This is a note.</Callout>
<Callout type="tip">This is a tip.</Callout>
<Callout type="warning">This is a warning.</Callout>
<Callout type="danger">This is a danger alert.</Callout>
<Callout type="info">This is info.</Callout>
<Callout type="tip" title="Custom Title">With a custom title.</Callout>
```

### Tabs

```mdx
import Tabs from '../../components/Tabs.astro';

<Tabs labels={["Tab 1", "Tab 2", "Tab 3"]}>
  <div>Content for Tab 1</div>
  <div>Content for Tab 2</div>
  <div>Content for Tab 3</div>
</Tabs>
```

### CodeGroup

```mdx
import CodeGroup from '../../components/CodeGroup.astro';

<CodeGroup labels={["npm", "pnpm", "yarn"]}>
  <div>```bash
npm install package
```</div>
  <div>```bash
pnpm add package
```</div>
  <div>```bash
yarn add package
```</div>
</CodeGroup>
```

### Steps

```mdx
import Steps from '../../components/Steps.astro';
import Step from '../../components/Step.astro';

<Steps>
  <Step title="First Step">
    Instructions for the first step.
  </Step>
  <Step title="Second Step">
    Instructions for the second step.
  </Step>
</Steps>
```

### Collapsible

```mdx
import Collapsible from '../../components/Collapsible.astro';

<Collapsible title="Click to expand">
  Hidden content here...
</Collapsible>

<Collapsible title="Open by default" defaultOpen={true}>
  This starts expanded.
</Collapsible>
```

### Example

```mdx
import Example from '../../components/Example.astro';

<Example title="Example Title" description="Optional description">
  Interactive content here
</Example>
```

## AI Chat Assistant

DocuBase includes a built-in AI chat assistant that uses RAG (Retrieval-Augmented Generation) to answer questions about your documentation.

### Setup

1. Copy the environment file:

```bash
cp .env.example .env
```

2. Add your API keys to `.env`:

```env
# Upstash Vector (https://console.upstash.com/vector)
UPSTASH_VECTOR_REST_URL=your_url_here
UPSTASH_VECTOR_REST_TOKEN=your_token_here

# Google Gemini (https://aistudio.google.com/apikey)
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

3. That's it! Content is automatically indexed on every build.

### How It Works

- Content is automatically indexed when you run `pnpm run build`
- Users can ask questions via the chat widget or "Ask Anything" input
- The AI searches your docs and provides relevant answers with sources
- No manual indexing required - just write docs and deploy

### Components

- **AskAnything**: Homepage input for starting a chat
- **ChatWidget**: Floating chat button available on all pages

## Storybook (Optional)

DocuBase includes an optional Storybook setup for developing and showcasing components:

```bash
# Start Storybook
npm run storybook
```

Storybook will be available at `http://localhost:6006`.

The Storybook setup is completely separable from the documentation site. You can:
- Remove the `.storybook/` directory and `src/stories/` if not needed
- Remove Storybook-related devDependencies from `package.json`
- Remove the `storybook` and `build-storybook` scripts

## Building for Production

```bash
# Build the static site
npm run build

# Preview the build
npm run preview
```

The output will be in the `dist/` directory.

## Deployment

DocuBase generates a static site that can be deployed to any hosting provider:

### Cloudflare Pages

1. Connect your repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`

### GitHub Pages

1. Add a GitHub Actions workflow:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Vercel / Netlify

Both platforms auto-detect Astro projects. Just connect your repository.

## Configuration

### Site URL

Update the `site` option in `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://docubase-docs.vercel.app',
  // ...
});
```

### Customizing Colors

Edit the CSS variables in `src/styles/global.css`:

```css
@theme {
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  /* ... */
}
```

## License

MIT
