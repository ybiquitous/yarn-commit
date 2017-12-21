const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

const baseDir = () => path.join(process.cwd(), '.yarn-commit-cache')

const setup = () => {
  const dir = baseDir()
  mkdirp.sync(dir)
  return dir
}

const file = (dir, name) => `${path.join(dir, name)}.json`

const cache = (name, init) => {
  const dir = setup()
  const f = file(dir, name)
  if (fs.existsSync(f)) {
    return JSON.parse(fs.readFileSync(f, 'utf8'))
  }

  const data = init()
  mkdirp.sync(path.dirname(f))
  fs.writeFileSync(f, JSON.stringify(data))
  return data
}

cache.clean = () => rimraf.sync(baseDir())

module.exports = cache
