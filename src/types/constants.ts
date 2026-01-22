export const SITE_TITLE = 'DocuBase';
export const SITE_DESCRIPTION = 'Beautiful documentation that scales with your product';

export const WORDS_PER_MINUTE = 200;

export const CALLOUT_TYPES = ['note', 'tip', 'warning', 'danger', 'info'] as const;
export type CalloutType = typeof CALLOUT_TYPES[number];

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
] as const;

export const DEFAULTS = {
  HERO: {
    subtitle: 'DocuBase',
    buttonText: 'Get Started',
    buttonHref: '/docs',
  },
  TOC: {
    title: 'On this Topic',
  },
  BLOG_CARD: {
    readTime: '10 min read',
  },
  TABS: {
    defaultIndex: 0,
  },
  COLLAPSIBLE: {
    defaultOpen: false,
  },
} as const;
