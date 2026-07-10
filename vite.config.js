import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                loadPaths: [path.resolve(__dirname)],
                silenceDeprecations: ['import'],
            },
        },
    },
    optimizeDeps: {
        exclude: ['examples'],
    },
})
