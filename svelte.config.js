import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const env = process.env.NODE_ENV;

const checkOrigin = !(env === 'preview' || env === 'development' || env === 'test');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			'@server': './src/lib/server',
			'@queries': './src/lib/server/db/queries',
			'@mutations': './src/lib/server/db/mutations',
			'@schemas': './src/lib/schemas',
			'@components': './src/lib/components',
			'@utils': './src/lib/utils',
			'@types': './src/lib/types',
			'@stores': './src/lib/stores',
			'@constants': './src/lib/constants',
			'@forms': './src/lib/components/forms'
		},
		csrf: { checkOrigin }
	}
};

export default config;
