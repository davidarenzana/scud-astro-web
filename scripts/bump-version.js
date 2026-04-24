#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagePath = path.join(__dirname, '../package.json');
const changelogPath = path.join(__dirname, '../CHANGELOG.md');

// Read package.json
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const currentVersion = pkg.version;
const [major, minor, patch] = currentVersion.split('.').map(Number);
const newVersion = `${major}.${minor}.${patch + 1}`;

console.log(`📦 Bumping version: ${currentVersion} → ${newVersion}`);

// Get commits since last tag or from beginning
let commits = [];
try {
  const lastTag = execSync('git describe --tags --abbrev=0 2>/dev/null || echo ""', {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'ignore']
  }).trim();

  const commitLog = lastTag
    ? execSync(`git log ${lastTag}..HEAD --oneline --pretty=format:"%h %s"`, {
        encoding: 'utf8'
      })
    : execSync('git log --oneline --pretty=format:"%h %s" | head -20', {
        encoding: 'utf8'
      });

  commits = commitLog
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      const [hash, ...msgParts] = line.split(' ');
      return { hash, message: msgParts.join(' ') };
    });
} catch (e) {
  console.warn('⚠️  No git history found, using empty changelog');
}

// Generate changelog entry
const now = new Date();
const dateStr = now.toISOString().split('T')[0];
const changelogEntry = `## [${newVersion}] - ${dateStr}

### Changed
${commits.length > 0 ? commits.map(c => `- ${c.message} (${c.hash})`).join('\n') : '- Initial release'}

`;

// Read existing changelog
let existingChangelog = '';
if (fs.existsSync(changelogPath)) {
  existingChangelog = fs.readFileSync(changelogPath, 'utf8');
}

// Write updated changelog
const newChangelog = changelogEntry + existingChangelog;
fs.writeFileSync(changelogPath, newChangelog, 'utf8');
console.log(`✅ CHANGELOG.md updated`);

// Update package.json
pkg.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log(`✅ package.json updated`);

// Commit changes
try {
  execSync('git add package.json CHANGELOG.md', { encoding: 'utf8' });
  execSync(`git commit -m "chore(release): bump to v${newVersion}"`, {
    encoding: 'utf8'
  });
  console.log(`✅ Changes committed`);
} catch (e) {
  console.error('❌ Git commit failed:', e.message);
  process.exit(1);
}

console.log(`\n🎉 Version ${newVersion} released!`);
