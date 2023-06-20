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
      crawl: true,
      entries: [
        '/docs/docs',
        '/docs/advanced-options-luigi-client',
        '/docs/advanced-scenarios',
        '/docs/application-setup',
        '/docs/authorization-configuration',
        '/docs/authorization-events',
        '/docs/communication',
        '/docs/content-guidelines',
        '/docs/faq',
        '/docs/framework-support-libraries',
        '/docs/general-settings',
        '/docs/getting-started',
        '/docs/global-search',
        '/docs/i18n',
        '/docs/lifecycle-hooks',
        '/docs/luigi-architecture',
        '/docs/luigi-client-api',
        '/docs/luigi-client-setup',
        '/docs/luigi-core-api',
        '/docs/luigi-testing-utilities',
        '/docs/luigi-ux-features',
        '/docs/microfrontend-routing',
        '/docs/navigation-advanced',
        '/docs/navigation-configuration-example',
        '/docs/navigation-configuration',
        '/docs/navigation-parameters-reference',
        '/docs/user-settings',
        '/docs/versions',
        '/docs/web-component',
        '/docs/auth-oauth2',
        '/docs/auth-oidc'
      ],
      handleMissingId: route => {
        return { status: 200 };
      }
    }
  },
  build: {
    outDir: 'public'
  }
};

export default config;
