
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commands = new Map()

for (const file of fs.readdirSync(__dirname)) {
  if (file === 'index.js') continue
  if (!file.endsWith('.js')) continue

  const { default: command } = await import(`./${file}`)

  if (!command?.name || typeof command.execute !== 'function') {
    throw new Error(`Invalid command module: ${file}`)
  }

  commands.set(command.name, command)
}

export function getCommand(name) {
  return commands.get(name)
}
