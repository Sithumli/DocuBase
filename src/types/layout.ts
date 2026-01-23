import type { BreadcrumbItem } from './components';

export interface DocsLayoutProps {
  title: string;
  description?: string;
  type?: 'docs' | 'blog' | 'tutorials';
}

export type ContentType = 'docs' | 'blog' | 'tutorials';

export interface ExtendedDocsLayoutProps extends DocsLayoutProps {
  entry?: any;
  headings?: any[];
  Content?: any;
  customBreadcrumbs?: BreadcrumbItem[];
}

export interface MarkdownHeading {
  depth: number;
  slug: string;
  text: string;
}
