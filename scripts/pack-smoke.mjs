// Consumer smoke test for the packed npm artifact:
// 1. npm-packs the library into a tarball,
// 2. installs it in a blank project WITHOUT peer auto-install
//    (npm --legacy-peer-deps ≈ yarn 1 semantics),
// 3. vite-builds an app importing every public entry point.
// Catches runtime imports that resolve in-repo (via devDependencies) but break
// for consumers — e.g. @bem-react/classname, reachable through @consta/uikit,
// which shipped missing from dependencies in the v6.0.0 prep.
import { execSync } from 'child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const dir = mkdtempSync(join(tmpdir(), 'admiral-pack-smoke-'))
const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit' })

run(`npm pack --pack-destination "${dir}"`, root)
const tarball = `${pkg.name.replace(/^@/, '').replace('/', '-')}-${pkg.version}.tgz`

// one import per exports-map entry: namespace import for JS, side-effect for CSS
const imports = []
const mods = []
Object.entries(pkg.exports).forEach(([key, value], i) => {
    const spec = pkg.name + key.slice(1)
    if (typeof value === 'string') {
        imports.push(`import '${spec}'`)
    } else {
        imports.push(`import * as m${i} from '${spec}'`)
        mods.push(`m${i}`)
    }
})
const counts = `console.log([${mods.join(', ')}].map((m) => Object.keys(m).length).join('/'))`

writeFileSync(
    join(dir, 'package.json'),
    JSON.stringify({ name: 'pack-smoke', private: true, type: 'module' }, null, 4),
)
writeFileSync(
    join(dir, 'index.html'),
    '<!doctype html><html><body><script type="module" src="/src/main.js"></script></body></html>',
)
mkdirSync(join(dir, 'src'))
writeFileSync(join(dir, 'src', 'main.js'), imports.join('\n') + '\n' + counts + '\n')

const peers = Object.entries(pkg.peerDependencies)
    .map(([name, range]) => `${name}@"${range}"`)
    .join(' ')
run(
    `npm install "${join(dir, tarball)}" ${peers} vite@"${pkg.devDependencies.vite}" ` +
        '--legacy-peer-deps --no-audit --no-fund',
    dir,
)
run('npx vite build', dir)

rmSync(dir, { recursive: true, force: true })
console.log('pack-smoke: OK — the packed artifact builds for a consumer without peer auto-install')
