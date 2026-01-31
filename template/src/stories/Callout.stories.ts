import type { Meta, StoryObj } from '@storybook/html';

interface CalloutArgs {
  type: 'note' | 'tip' | 'warning' | 'danger' | 'info';
  title: string;
  content: string;
}

const styles = {
  note: {
    container: 'bg-gray-50 border-gray-200',
    icon: 'text-gray-600',
    title: 'text-gray-900',
  },
  tip: {
    container: 'bg-green-50 border-green-200',
    icon: 'text-green-600',
    title: 'text-green-900',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200',
    icon: 'text-yellow-600',
    title: 'text-yellow-900',
  },
  danger: {
    container: 'bg-red-50 border-red-200',
    icon: 'text-red-600',
    title: 'text-red-900',
  },
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-600',
    title: 'text-blue-900',
  },
};

const icons = {
  note: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" /></svg>`,
  tip: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" /></svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>`,
  danger: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>`,
};

const createCallout = ({ type, title, content }: CalloutArgs): string => {
  const style = styles[type];
  return `
    <div class="my-6 rounded-lg border p-4 ${style.container}">
      <div class="flex items-start gap-3">
        <span class="mt-0.5 shrink-0 ${style.icon}">${icons[type]}</span>
        <div class="flex-1 min-w-0">
          <p class="font-semibold mb-1 ${style.title}">${title}</p>
          <div class="text-sm">
            <p class="m-0">${content}</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

const meta: Meta<CalloutArgs> = {
  title: 'Components/Callout',
  tags: ['autodocs'],
  render: (args) => createCallout(args),
  argTypes: {
    type: {
      control: 'select',
      options: ['note', 'tip', 'warning', 'danger', 'info'],
      description: 'The type of callout',
    },
    title: {
      control: 'text',
      description: 'The callout title',
    },
    content: {
      control: 'text',
      description: 'The callout content',
    },
  },
};

export default meta;
type Story = StoryObj<CalloutArgs>;

export const Note: Story = {
  args: {
    type: 'note',
    title: 'Note',
    content: 'This is a note callout for general information.',
  },
};

export const Tip: Story = {
  args: {
    type: 'tip',
    title: 'Tip',
    content: 'This is a tip callout for helpful suggestions.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning',
    content: 'This is a warning callout for potential issues.',
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
    title: 'Danger',
    content: 'This is a danger callout for critical warnings.',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Info',
    content: 'This is an info callout for informational content.',
  },
};

export const CustomTitle: Story = {
  args: {
    type: 'tip',
    title: 'Pro Tip',
    content: 'You can customize the callout title to better suit your needs.',
  },
};
