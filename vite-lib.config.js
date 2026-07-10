import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'))
const externalDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
]

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
    build: {
        copyPublicDir: false,
        outDir: 'lib',
        lib: {
            entry: {
                index: path.resolve(__dirname, 'admiral/index.ts'),
                'ui/index': path.resolve(__dirname, 'admiral/ui/index.ts'),
                'auth/index': path.resolve(__dirname, 'admiral/auth/index.ts'),
                'locale/index': path.resolve(__dirname, 'admiral/locale/index.ts'),
                'theme/index': path.resolve(__dirname, 'admiral/theme/index.ts'),
                'crud/index': path.resolve(__dirname, 'admiral/crud/index.tsx'),
                'form/index': path.resolve(__dirname, 'admiral/form/index.tsx'),
                'admin/index': path.resolve(__dirname, 'admiral/admin/index.tsx'),
                'router/index': path.resolve(__dirname, 'admiral/router/index.tsx'),
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: (id) => {
                // Externalize all dependencies and their sub-paths
                return externalDeps.some((dep) => id === dep || id.startsWith(dep + '/'))
            },
            output: {
                preserveModules: true,
                preserveModulesRoot: 'admiral',
                entryFileNames: '[name].mjs',
                assetFileNames: 'admiral.[ext]',
            },
        },
    },
})
