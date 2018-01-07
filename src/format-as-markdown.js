const table = require('markdown-table')
const hostedGitInfo = require('hosted-git-info')
const exec = require('./exec')

const markdownLink = (text, url) => `[${text}](${url})`

const packageInfo = (name, prop) => exec.yarn('info', [name, prop]).trim()

const repoUrl = name =>
  hostedGitInfo.fromUrl(packageInfo(name, 'repository.url')).browse()

const version = (from, to) => (from && to ? `${from}...${to}` : from || to)

const toRow = ({ type, name, from, to }) => [
  type,
  markdownLink(name, repoUrl(name)),
  version(from, to),
]

const formatAsMarkdown = diff =>
  table([['Type', 'Name', 'Version'], ...diff.map(toRow)])

module.exports = formatAsMarkdown
