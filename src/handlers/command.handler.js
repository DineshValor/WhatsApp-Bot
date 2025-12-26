import { getCommand } from '../commands/index.js'

export async function handleCommand(ctx) {
  const { commandName } = ctx
  const command = getCommand(commandName)
  if (!command) return

  await command.execute(ctx)
}
