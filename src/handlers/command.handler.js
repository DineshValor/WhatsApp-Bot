import { getCommand } from '../commands/index.js'
import { CONFIG } from '../config/index.js'

export async function handleCommand(ctx) {
  const command = getCommand(ctx.commandName)
  if (!command) return

  // Owner check
  if (command.ownerOnly && !ctx.isOwner) {
    return ctx.sock.sendMessage(ctx.jid, {
      text: '❌ Owner only command'
    })
  }

  // Group check
  if (command.groupOnly && !ctx.isGroup) {
    return ctx.sock.sendMessage(ctx.jid, {
      text: '❌ This command works only in groups'
    })
  }

  try {
    await command.execute(ctx)
  } catch (err) {
    console.error(`Command error: ${ctx.commandName}`, err)
    await ctx.sock.sendMessage(ctx.jid, {
      text: '⚠️ Command failed'
    })
  }
}
