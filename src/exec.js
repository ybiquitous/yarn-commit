const { EOL } = require('os')
const { spawnSync } = require('child_process')

const exec = (command, args, options = {}) => {
  const opts = {
    shell: true,
    encoding: 'utf8',
    stdio: ['ignore', options.ignoreStdout ? 'ignore' : 'pipe', 'pipe'],
  }
  const { error, status, stderr, stdout } = spawnSync(command, args, opts)
  if (error) {
    throw error
  }
  if (status !== 0) {
    const cmd = [command, ...args].join(' ')
    throw new Error(`failed and exited with ${status}: ${cmd}${EOL}${stderr}`)
  }
  return stdout
}

const yarn = (command, args, options) =>
  exec(
    'yarn',
    ['--silent', '--no-progress', '--prefer-offline', command, ...args],
    options
  )

module.exports = exec
module.exports.yarn = yarn
