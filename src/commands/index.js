import ping from './ping.js'

const commands = new Map()
commands.set(ping.name, ping)

export function getCommand(name) {
  return commands.get(name)
}
