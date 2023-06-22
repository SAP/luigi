import { vitePreprocess } from '@sveltejs/kit/vite';
// import adapter from '@sveltejs/adapter-netlify';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    // Netlify adapter: See https://kit.svelte.dev/docs/adapter-netlify
    adapter: adapter({
      strict: false
    }),
    prerender: {
      handleMissingId: route => {
        // SvelteKit vite build phase attempts to crawl the site by looking at links/ids between pages. Since we don't have guaranteed links between all pages,
        // it produces an error that some links were not found. This is not relevant in our case since the site is exported to production with HTMLs produced of the docs.json file,
        // which is in itself always in sync with the local root /docs folder that contains the .md files
        return { status: 200 };
      }
    },
    serviceWorker: {
      register: false
    }
  },
  build: {
    outDir: 'public'
  }
};

export default config;
