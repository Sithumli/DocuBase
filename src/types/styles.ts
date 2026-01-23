import type { CalloutType } from './constants';

export interface CalloutStyle {
  border: string;
  line: string;
}

export const CALLOUT_STYLES: Record<CalloutType, CalloutStyle> = {
  note: {
    border: 'border-gray-400 dark:border-gray-500',
    line: 'bg-gray-400 dark:bg-gray-500',
  },
  tip: {
    border: 'border-green-500 dark:border-green-500',
    line: 'bg-green-500',
  },
  warning: {
    border: 'border-yellow-500 dark:border-yellow-500',
    line: 'bg-yellow-500',
  },
  danger: {
    border: 'border-red-500 dark:border-red-500',
    line: 'bg-red-500',
  },
  info: {
    border: 'border-blue-500 dark:border-blue-500',
    line: 'bg-blue-500',
  },
} as const;

export const CALLOUT_DEFAULT_TITLES: Record<CalloutType, string> = {
  note: 'Note',
  tip: 'Tip',
  warning: 'Warning',
  danger: 'Danger',
  info: 'Info',
} as const;

export const TAB_CLASSES = {
  active: ['text-primary-600', 'dark:text-white', 'bg-gray-100', 'dark:bg-gray-800'],
  inactive: ['text-gray-700', 'dark:text-gray-400'],
} as const;

export const CODE_GROUP_CLASSES = {
  active: [
    'text-primary-600',
    'dark:text-primary-400',
    'border-b-2',
    'border-primary-600',
    'dark:border-primary-400',
    '-mb-px',
    'bg-white',
    'dark:bg-gray-900',
  ],
  inactive: ['text-gray-600', 'dark:text-gray-400'],
} as const;
