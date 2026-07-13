// publint lints package.json/exports directly; attw needs a real,
// installable tarball to inspect the built dist/ exports and types.
// `attw --pack .` shells out to `npm pack`, which fails under pnpm-only
// devEngines with EBADDEVENGINES, so this script builds the tarball
// with `pnpm pack` at a fixed filename and hands it to attw directly,
// propagating whichever step's exit code failed. A try/finally cleans
// up the tarball if pack or attw fails; a leading cleanup also clears
// any tarball left by an interrupted prior run, so the guarantee holds
// even when publint itself fails early. The run() helper also logs
// spawnSync's `.error`, so a step that fails to start (rather than
// exiting non-zero) reports its root cause instead of just a generic
// exit code.
import { spawnSync } from 'node:child_process'
import { rmSync } from 'node:fs'

const TARBALL = 'package.tgz'

const run = (label, command, args) => {
  const result = spawnSync(command, args, { stdio: 'inherit' })

  if (result.error) {
    console.error(`check:package: could not run ${label}:`, result.error.message)
  }

  return result.status ?? 1
}

// Clears a tarball left behind by an interrupted prior run up front,
// since the try/finally below only runs once publint has passed.
rmSync(TARBALL, { force: true })

let code = run('publint', 'pnpm', ['exec', 'publint'])

if (code === 0) {
  try {
    code = run('pnpm pack', 'pnpm', ['pack', '--out', TARBALL])

    if (code === 0) {
      code = run('attw', 'pnpm', ['exec', 'attw', TARBALL, '--profile', 'esm-only'])
    }
  } finally {
    rmSync(TARBALL, { force: true })
  }
}

process.exitCode = code
