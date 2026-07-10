// Post-processes tsc declaration output in lib/:
// 1. Strips side-effect style imports (import './x.scss') — the .scss sources
//    are not shipped, so consumer TypeScript could not resolve them.
// 2. Adds explicit extensions to relative import specifiers — node16/nodenext
//    module resolution refuses extensionless ESM imports inside .d.ts files.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const lib = join(dirname(fileURLToPath(import.meta.url)), '..', 'lib')

function withExtension(spec, fileDir) {
    if (/\.(js|mjs|cjs|json|css)$/.test(spec)) {
        return spec
    }
    const abs = resolve(fileDir, spec)
    if (existsSync(abs + '.d.ts')) {
        return spec + '.js'
    }
    if (existsSync(join(abs, 'index.d.ts'))) {
        return spec + '/index.js'
    }
    return spec
}

function processDts(path) {
    const fileDir = dirname(path)
    const source = readFileSync(path, 'utf8')
    const cleaned = source
        .replace(/^import\s+['"][^'"]+\.(scss|css)['"];?\r?\n/gm, '')
        .replace(
            /(from\s+['"])(\.\.?\/[^'"]+)(['"])/g,
            (_, pre, spec, post) => pre + withExtension(spec, fileDir) + post,
        )
        .replace(
            /(import\(['"])(\.\.?\/[^'"]+)(['"]\))/g,
            (_, pre, spec, post) => pre + withExtension(spec, fileDir) + post,
        )
    if (cleaned !== source) {
        writeFileSync(path, cleaned)
    }
}

function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) {
            walk(path)
        } else if (entry.name.endsWith('.d.ts')) {
            processDts(path)
        }
    }
}

walk(lib)
