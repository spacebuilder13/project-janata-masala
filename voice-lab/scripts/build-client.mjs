import * as esbuild from 'esbuild'
import { mkdirSync, copyFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')

mkdirSync(publicDir, { recursive: true })

await esbuild.build({
  entryPoints: [join(root, 'src/voice-app.ts')],
  bundle: true,
  outfile: join(publicDir, 'app.js'),
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  sourcemap: true,
})

const htmlSrc = join(root, 'src/index.html')
const htmlDst = join(publicDir, 'index.html')
if (existsSync(htmlSrc)) {
  copyFileSync(htmlSrc, htmlDst)
}

const cssSrc = join(root, 'src/styles.css')
const cssDst = join(publicDir, 'styles.css')
if (existsSync(cssSrc)) {
  copyFileSync(cssSrc, cssDst)
}

console.log('Built voice-lab client → public/')
