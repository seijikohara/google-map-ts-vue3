// publint lints package.json/exports directly; attw needs a real,
// installable tarball to inspect the built dist/ exports and types.
// `attw --pack .` shells out to `npm pack`, which fails under pnpm-only
// devEngines with EBADDEVENGINES, so this script builds the tarball
// with `pnpm pack` at a fixed filename and hands it to attw directly,
// propagating whichever step's exit code failed. A try/finally cleans
// up the tarball if pack or attw fails; a leading cleanup also clears
// any tarball left by an interrupted prior run, so the guarantee holds
// even when publint itself fails early.
import { spawnSync } from 'node:child_process'
import { rmSync } from 'node:fs'

const TARBALL = 'package.tgz'

// Clears a tarball left behind by an interrupted prior run up front,
// since the try/finally below only runs once publint has passed.
rmSync(TARBALL, { force: true })

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
