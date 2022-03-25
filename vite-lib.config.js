import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    build: {
        outDir: 'lib',
        lib: {
            entry: path.resolve(__dirname, 'admiral/index.ts'),
            name: 'admiral',
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
})
