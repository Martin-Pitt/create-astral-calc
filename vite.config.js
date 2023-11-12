import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	base: '',
	define: {
		'import.meta.env.GENERATED_AT': JSON.stringify(new Date().toJSON()),
	},
});
