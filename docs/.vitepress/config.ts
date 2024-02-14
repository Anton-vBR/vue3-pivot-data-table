import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vue3-pivot-data-table/',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../'),
      },
    },
  },
  title: 'vue3-pivot-data-table',
  description: 'A simple website for the component',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [{ text: 'Get started', link: '/introduction/get-started' }],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Basic', link: '/examples/basic' },
          { text: 'Column', link: '/examples/column' },
          { text: 'Error', link: '/examples/error' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'Props', link: '/api/props' },
          { text: 'Emits', link: '/api/emits' },
          { text: 'Expose', link: '/api/expose' },
          { text: 'Slots', link: '/api/slots' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/Anton-vBR/vue3-pivot-data-table' }],
  },
});
