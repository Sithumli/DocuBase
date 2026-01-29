export const SITE_TITLE = 'DocuBase';
export const SITE_DESCRIPTION = 'Beautiful documentation that scales with your product';
export const GITHUB_URL = 'https://github.com/Sithumli/DocuBase';

export const WORDS_PER_MINUTE = 200;

export const CALLOUT_TYPES = ['note', 'tip', 'warning', 'danger', 'info'] as const;
export type CalloutType = (typeof CALLOUT_TYPES)[number];

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
] as const;

export const DEFAULTS = {
  HERO: {
    subtitle: 'DocuBase',
    buttonText: 'Get Started',
    buttonHref: '/docs/getting-started',
  },
  TOC: {
    title: 'On this Page',
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

export const DATA_ATTRIBUTES = {
  toc: 'data-toc',
  tocLink: 'data-toc-link',
  tocContextual: 'data-toc-contextual',
  pageNav: 'data-page-nav',
  tabs: 'data-tabs',
  tabIndex: 'data-tab-index',
  defaultIndex: 'data-default-index',
  codeGroup: 'data-code-group',
  collapsible: 'data-collapsible',
  h2Section: 'data-h2-section',
  h2Id: 'data-h2-id',
} as const;

export const SELECTORS = {
  tabButton: '.tab-button',
  tabPanels: '.tab-panels',
  tocLink: '.toc-link',
  codeGroupTab: '.code-group-tab',
  codeGroupPanels: '.code-group-panels',
  collapsibleTrigger: '.collapsible-trigger',
  collapsibleContent: '.collapsible-content',
  collapsibleIcon: '.collapsible-icon',
  tocCollapsibleBox: '.toc-collapsible-box',
  sidebarSlot: '.sidebar-slot',
  codeCopyBtn: '.code-copy-btn',
} as const;

export const INIT_FLAGS = {
  toc: '__tocInitialized',
  tabs: '__tabsInitialized',
  collapsible: '__collapsibleInitialized',
  codeGroup: '__codeGroupInitialized',
  themeToggle: '__themeToggleInitialized',
} as const;

export const EVENTS = {
  click: 'click',
  keydown: 'keydown',
  mouseenter: 'mouseenter',
  mouseleave: 'mouseleave',
  astroPageLoad: 'astro:page-load',
} as const;

export const TIMING = {
  copyButtonReset: 2000,
  sidebarTransition: 400,
  tocTransition: 400,
} as const;

export const TOC_OBSERVER_OPTIONS = {
  rootMargin: '-80px 0px -70% 0px',
  threshold: 0,
} as const;

export const SCROLL_OPTIONS = {
  behavior: 'smooth',
  block: 'start',
} as const;

export const THEME = {
  storageKey: 'theme',
  dark: 'dark',
  light: 'light',
} as const;

export type Theme = 'dark' | 'light';

export const LAYOUT = {
  stickyTop: 'sticky top-28',
  collapsedMargin: '-12rem',
} as const;
