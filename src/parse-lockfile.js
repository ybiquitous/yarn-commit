const fs = require('fs')
const lockfile = require('@yarnpkg/lockfile')

const parseLockfile = file => lockfile.parse(fs.readFileSync(file, 'utf8'))
module.exports = parseLockfile
