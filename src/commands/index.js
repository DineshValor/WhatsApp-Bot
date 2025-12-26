import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const commands = new Map()

for (const file of fs.readdirSync(__dirname)) {
  if (file === 'index.js' || !file.endsWith('.js')) continue
  const { default: command } = await import(`./${file}`)
  commands.set(command.name, command)
}

export function getCommand(name) {
  return commands.get(name)
}
