import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const changelogPath = path.resolve(__dirname, '../CHANGELOG.md')

if (fs.existsSync(changelogPath)) {
  let content = fs.readFileSync(changelogPath, 'utf8')
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
  
  // Find any headings like "## 1.2.3" that don't have a date appended yet
  // and append the current date string: "## 1.2.3 - Mar 31, 2026"
  content = content.replace(/^(## \d+\.\d+\.\d+)(?!\s+-)/gm, `$1 - ${dateStr}`)
  
  fs.writeFileSync(changelogPath, content)
  console.log(`🗓️ Appended date (${dateStr}) to new changelog entries.`)
}
