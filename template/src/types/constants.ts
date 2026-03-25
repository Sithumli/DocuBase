export const SITE_TITLE = 'DocuBase';
export const SITE_DESCRIPTION = 'Beautiful documentation that scales with your product';
export const GITHUB_URL = 'https://github.com/Sithumli/DocuBase';

export const ASSETS_CDN_BASE = 'https://cdn.jsdelivr.net/gh/Sithumli/DocuBase@main/assets';

export const BANNER_IMAGES = {
  docs: `${ASSETS_CDN_BASE}/DocsBanner.webp`,
  tutorials: `${ASSETS_CDN_BASE}/TutBanner.webp`,
  blog: `${ASSETS_CDN_BASE}/BlogBanner.webp`,
} as const;

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

export const CHAT = {
  API_ENDPOINT: '/api/chat',
  MODELS: ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-3.0-flash'],
  VECTOR_TOP_K: 5,
  TEXTAREA_MAX_HEIGHT: 150,
  WELCOME_MESSAGE: "Hi! I'm your DocuBase assistant. Ask me anything about the documentation, components, or how to get started.",
  ASSISTANT_NAME: 'DocuBase Assistant',
  RATE_LIMIT_MESSAGE: "I've reached my daily limit. Please try again tomorrow!",
} as const;

export const INDEXING = {
  BATCH_SIZE: 10,
  BATCH_DELAY_MS: 500,
  DEBOUNCE_MS: 1000,
  MIN_CHUNK_LENGTH: 50,
  COLLECTIONS: ['docs', 'blog', 'tutorials'],
} as const;

export const CHAT_DEFAULTS = {
  ASK_ANYTHING: {
    subtitle: 'Meet AI Chat Mode',
    placeholder: 'Ask anything',
    suggestions: [
      'How do I get started with DocuBase?',
      'What components are available?',
      'How to deploy my docs?',
    ],
  },
} as const;

export const CHAT_SELECTORS = {
  askForm: 'ask-form',
  askInput: 'ask-input',
  askSubmit: 'ask-submit',
  suggestionChip: '.suggestion-chip',
  chatTrigger: 'chat-trigger',
  chatModal: 'chat-modal',
  chatBackdrop: 'chat-backdrop',
  chatClose: 'chat-close',
  chatForm: 'chat-form',
  chatInput: 'chat-input',
  chatSubmit: 'chat-submit',
  chatMessages: 'chat-messages',
  sendIcon: 'send-icon',
  loadingIcon: 'loading-icon',
} as const;

export const CHAT_ROLES = {
  user: 'user',
  assistant: 'assistant',
  model: 'model',
} as const;

export type ChatRole = (typeof CHAT_ROLES)[keyof typeof CHAT_ROLES];
