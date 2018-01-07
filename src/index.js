const path = require('path')
const exec = require('./exec')
const parseLockfile = require('./parse-lockfile')
const compare = require('./compare')
const formatAsMarkdown = require('./format-as-markdown')

const main = () => {
  const cwd = process.cwd()

  const before = parseLockfile(path.join(cwd, 'yarn.lock'))

  exec.yarn('upgrade', [], { ignoreStdout: true })

  const after = parseLockfile(path.join(cwd, 'yarn.lock'))

  const diff = compare(before, after)

  return formatAsMarkdown(diff)
}

module.exports = main
