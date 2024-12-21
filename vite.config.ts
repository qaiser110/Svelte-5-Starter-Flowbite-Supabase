import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},

	esbuild: {
		// Remove console.* calls in production build
		pure: ['console.debug', 'console.info', 'console.log'],
		// pure: process.env.NODE_ENV === 'production' ? ['console.log'] : [],
	},
});
