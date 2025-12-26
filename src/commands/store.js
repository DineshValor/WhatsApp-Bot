const commands = new Map()

export function register(command) {
  commands.set(command.name, command)
}

export function get(name) {
  return commands.get(name)
}

export function getAllCommands() {
  return [...commands.values()]
}
