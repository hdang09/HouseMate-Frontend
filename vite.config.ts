import { defineConfig } from 'vite';
import htmlMinifier from 'rollup-plugin-html-minifier';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    server: {
        watch: {
            usePolling: true,
        },
        host: true, // needed for the Docker Container port mapping to work
        strictPort: true,
        port: 5173, // you can replace this port with any port
    },
    define: { global: {} },
    build: {
        rollupOptions: {
            plugins: [
                htmlMinifier({
                    options: {
                        collapseWhitespace: true,
                        removeComments: true,
                    },
                }),
            ],
        },
    },
});
