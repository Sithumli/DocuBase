# DocuBase

A general-purpose documentation template for web projects. Framework-agnostic, content-first, and ready to deploy.

**Live Demo:** [https://docubase-docs.vercel.app](https://docubase-docs.vercel.app)

## Features

- **Content-First**: Write documentation in MDX with full component support
- **Framework-Agnostic**: Works with any UI library or none at all
- **Multiple Content Types**: Documentation, blog posts, and tutorials out of the box
- **Static Site Generation**: Fast, SEO-friendly pages that deploy anywhere
- **Type-Safe**: Full TypeScript support with Astro Content Collections
- **Dark Mode**: Automatic dark mode support via CSS media queries

## Tech Stack

- [Astro](https://astro.build/) - Static site framework
- [MDX](https://mdxjs.com/) - Markdown with components
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Storybook](https://storybook.js.org/) - Component playground (optional)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/Sithumli/DocuBase.git my-docs
cd my-docs

# Install dependencies
pnpm install

# Start development server
pnpm dev
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

## Storybook (Optional)

DocuBase includes an optional Storybook setup for developing and showcasing components:

```bash
# Install Storybook dependencies
pnpm install

# Start Storybook
pnpm storybook
```

Storybook will be available at `http://localhost:6006`.

The Storybook setup is completely separable from the documentation site. You can:
- Remove the `.storybook/` directory and `src/stories/` if not needed
- Remove Storybook-related devDependencies from `package.json`
- Remove the `storybook` and `build-storybook` scripts

## Building for Production

```bash
# Build the static site
pnpm build

# Preview the build
pnpm preview
```

The output will be in the `dist/` directory.

## Deployment

DocuBase generates a static site that can be deployed to any hosting provider:

### Cloudflare Pages

1. Connect your repository to Cloudflare Pages
2. Set build command: `pnpm build`
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
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm build
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
