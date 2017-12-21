const jsonpatch = require('fast-json-patch')

const withVersionOnly = e => e.path.endsWith('/version')

const parseType = op => (op === 'replace' ? 'update' : op)

const extractName = path =>
  path
    .split('/')
    .map(c => jsonpatch.unescapePathComponent(c))[2]
    .split('@')[0]

const toFormat = before => ({ op, path, value }) => ({
  type: parseType(op),
  name: extractName(path),
  from: jsonpatch.getValueByPointer(before, path),
  to: value,
})

const compare = (before, after) =>
  jsonpatch
    .compare(before, after)
    .filter(withVersionOnly)
    .map(toFormat(before))

module.exports = compare
