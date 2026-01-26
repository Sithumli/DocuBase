import type { BreadcrumbItem, ContentType } from './components';

export interface DocsLayoutProps {
  title: string;
  description?: string;
  type?: ContentType;
}

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
