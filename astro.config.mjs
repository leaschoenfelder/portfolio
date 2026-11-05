import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://schoenfelder.co',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
