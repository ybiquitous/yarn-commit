const path = require('path')
const { execSync } = require('child_process')
const parseLockfile = require('./parse-lockfile')
const compare = require('./compare')
const formatAsMarkdown = require('./format-as-markdown')
const cache = require('./cache')

const main = () => {
  const cwd = process.cwd()

  if (process.argv.includes('--no-cache')) {
    cache.clean()
  }

  const before = cache('before', () =>
    parseLockfile(path.join(cwd, 'yarn.lock'))
  )

  execSync(`yarn upgrade --prefer-offline --cwd "${cwd}"`)

  const after = parseLockfile(path.join(cwd, 'yarn.lock'))

  const diff = compare(before, after)
  console.log(formatAsMarkdown(diff))
}

module.exports = main
