import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['__tests__/**/*.test.ts'],
    globals: true,
  },
});
