import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { register, get } from './store.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

for (const file of fs.readdirSync(__dirname)) {
  if (['index.js', 'store.js', 'meta.js'].includes(file)) continue
  if (!file.endsWith('.js')) continue

  const { default: command } = await import(`./${file}`)
  register(command)
}

export function getCommand(name) {
  return get(name)
}
