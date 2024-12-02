/// <reference types="vitest" />

import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [angular()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['src/test-setup.ts'],
            include: ['**/*.spec.ts'],
            reporters: ['default', 'html'],
            coverage: {
                provider: 'v8',
                reporter: ['text', 'json', 'html'],
            },
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        define: {
            'import.meta.vitest': mode !== 'production',
        },
    };
});
