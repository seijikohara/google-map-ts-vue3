// publint lints package.json/exports directly; attw needs a real,
// installable tarball to inspect the built dist/ exports and types.
// `attw --pack .` shells out to `npm pack`, which fails under pnpm-only
// devEngines with EBADDEVENGINES, so this script builds the tarball
// with `pnpm pack` at a fixed filename and hands it to attw directly,
// propagating whichever step's exit code failed; a try/finally cleans
// up the tarball regardless of which step fails.
import { spawnSync } from 'node:child_process'
import { rmSync } from 'node:fs'

const TARBALL = 'package.tgz'

const publint = spawnSync('pnpm', ['exec', 'publint'], { stdio: 'inherit' })

if (publint.status !== 0) {
  process.exitCode = publint.status ?? 1
} else {
  try {
    const pack = spawnSync('pnpm', ['pack', '--out', TARBALL], { stdio: 'inherit' })

    if (pack.status !== 0) {
      process.exitCode = pack.status ?? 1
    } else {
      const attw = spawnSync('pnpm', ['exec', 'attw', TARBALL, '--profile', 'esm-only'], {
        stdio: 'inherit'
      })

      process.exitCode = attw.status ?? 1
    }
  } finally {
    rmSync(TARBALL, { force: true })
  }
}
