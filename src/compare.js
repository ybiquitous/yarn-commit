const jsonpatch = require('fast-json-patch')
const { pipe, filter, map, sortBy, uniqBy } = require('lodash/fp')

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
  pipe(
    filter(withVersionOnly),
    map(toFormat(before)),
    sortBy('name'),
    uniqBy('name')
  )(jsonpatch.compare(before, after))

module.exports = compare
