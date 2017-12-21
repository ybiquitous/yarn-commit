const { execSync } = require('child_process')
const table = require('markdown-table')
const hostedGitInfo = require('hosted-git-info')
const cache = require('./cache')

const markdownLink = (text, url) => `[${text}](${url})`

const command = cmd => execSync(cmd, { encoding: 'utf8' }).trim()

const packageInfo = (name, prop) =>
  cache(`${name}/${prop}`, () => command(`npm view '${name}' '${prop}'`))

const repoUrl = name =>
  hostedGitInfo.fromUrl(packageInfo(name, 'repository.url')).browse()

const toRow = ({ type, name, from, to }) => [
  type,
  markdownLink(name, repoUrl(name)),
  from,
  to,
]

const formatAsMarkdown = diff =>
  table([['type', 'name', 'from', 'to'], ...diff.map(toRow)])

module.exports = formatAsMarkdown
