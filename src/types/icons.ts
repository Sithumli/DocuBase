export const TAB_LABEL_ICONS: Record<string, string> = {
  javascript: 'logos:javascript',
  js: 'logos:javascript',
  typescript: 'logos:typescript-icon',
  ts: 'logos:typescript-icon',

  python: 'logos:python',
  py: 'logos:python',

  bash: 'codicon:terminal-bash',
  shell: 'codicon:terminal-bash',
  sh: 'codicon:terminal-bash',
  terminal: 'codicon:terminal',

  npm: 'logos:npm-icon',
  pnpm: 'logos:pnpm',
  yarn: 'logos:yarn',
  bun: 'logos:bun',

  react: 'logos:react',
  jsx: 'logos:react',
  tsx: 'logos:react',
  vue: 'logos:vue',
  svelte: 'logos:svelte-icon',
  astro: 'logos:astro-icon',

  html: 'logos:html-5',
  css: 'logos:css-3',
  json: 'logos:json',

  rust: 'logos:rust',
  go: 'logos:go',
  java: 'logos:java',
  php: 'logos:php',
  ruby: 'logos:ruby',
  swift: 'logos:swift',
  kotlin: 'logos:kotlin-icon',
  sql: 'tabler:sql',

  docker: 'logos:docker-icon',
  git: 'logos:git-icon',
} as const;

export const FEATURE_CARD_ICONS: Record<string, string> = {
  'getting-started': `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
  installation: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>`,
  'core-concept': `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
} as const;

export const COPY_BUTTON_ICONS = {
  copy: 'mdi:content-copy',
  check: 'mdi:check',
} as const;

export function getTabIcon(label: string): string | null {
  const normalizedLabel = label.toLowerCase().trim();
  return TAB_LABEL_ICONS[normalizedLabel] || null;
}

export function getFeatureCardIcon(iconKey: string | undefined, defaultKey = 'getting-started'): string {
  return iconKey && FEATURE_CARD_ICONS[iconKey] ? FEATURE_CARD_ICONS[iconKey] : FEATURE_CARD_ICONS[defaultKey];
}
