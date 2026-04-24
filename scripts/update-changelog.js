#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const changelogPath = path.join(__dirname, '../CHANGELOG.md')

console.log('📝 Updating CHANGELOG.md...\n')

// Get recent commits (last push/merge)
let commits = []
try {
  // Get the last tag or use recent commits
  let lastTag = ''
  try {
    lastTag = execSync('git describe --tags --abbrev=0 2>/dev/null', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()
  } catch {
    lastTag = ''
  }

  // Get all commits since tag or last 15 commits
  const range = lastTag ? `${lastTag}..HEAD` : 'HEAD~15..HEAD'
  const commitLog = execSync(`git log ${range} --pretty=format:"%h %s" --reverse`, {
    encoding: 'utf8',
  })

  commits = commitLog
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => {
      const [hash, ...parts] = line.split(' ')
      return { hash, subject: parts.join(' ') }
    })
} catch (e) {
  console.warn('⚠️  Could not retrieve git history:', e.message)
}

if (commits.length === 0) {
  console.log('ℹ️  No new commits to add to changelog')
  process.exit(0)
}

// Parse conventional commits
const sections = {
  features: [],
  fixes: [],
  improvements: [],
  docs: [],
  chore: [],
  other: [],
}

commits.forEach(({ hash, subject }) => {
  const match = subject.match(/^(feat|fix|docs|style|refactor|perf|test|chore|ci)(\(.+\))?:?\s+(.+)/)

  if (!match) {
    sections.other.push({ hash, text: subject })
    return
  }

  const [, type, scope, description] = match
  const text = scope ? `${description} ${scope}` : description

  switch (type) {
    case 'feat':
      sections.features.push({ hash, text })
      break
    case 'fix':
      sections.fixes.push({ hash, text })
      break
    case 'docs':
      sections.docs.push({ hash, text })
      break
    case 'refactor':
    case 'perf':
      sections.improvements.push({ hash, text })
      break
    case 'chore':
    case 'ci':
      sections.chore.push({ hash, text })
      break
    default:
      sections.other.push({ hash, text })
  }
})

// Build changelog entry
const today = new Date().toISOString().split('T')[0]
let changelogEntry = '## [Unreleased]\n\n'

if (sections.features.length > 0) {
  changelogEntry += '### Added\n'
  sections.features.forEach(({ text, hash }) => {
    changelogEntry += `- ${text} (${hash})\n`
  })
  changelogEntry += '\n'
}

if (sections.fixes.length > 0) {
  changelogEntry += '### Fixed\n'
  sections.fixes.forEach(({ text, hash }) => {
    changelogEntry += `- ${text} (${hash})\n`
  })
  changelogEntry += '\n'
}

if (sections.improvements.length > 0) {
  changelogEntry += '### Improved\n'
  sections.improvements.forEach(({ text, hash }) => {
    changelogEntry += `- ${text} (${hash})\n`
  })
  changelogEntry += '\n'
}

if (sections.docs.length > 0) {
  changelogEntry += '### Documentation\n'
  sections.docs.forEach(({ text, hash }) => {
    changelogEntry += `- ${text} (${hash})\n`
  })
  changelogEntry += '\n'
}

// Read existing changelog
let existingChangelog = ''
if (fs.existsSync(changelogPath)) {
  existingChangelog = fs.readFileSync(changelogPath, 'utf8')
  // Remove existing [Unreleased] section if it exists
  existingChangelog = existingChangelog.replace(/^## \[Unreleased\]\s*\n\n[\s\S]*?(?=^## \[|$)/m, '')
}

// Write updated changelog
const newChangelog = changelogEntry + existingChangelog
fs.writeFileSync(changelogPath, newChangelog, 'utf8')

console.log('✅ CHANGELOG.md updated with:')
console.log(`   📌 Features: ${sections.features.length}`)
console.log(`   🔧 Fixes: ${sections.fixes.length}`)
console.log(`   ⚡ Improvements: ${sections.improvements.length}`)
console.log(`   📖 Docs: ${sections.docs.length}`)
