import { getCommand } from '../commands/index.js'
import { resolveAdmin } from '../utils/permissions.util.js'

export async function handleCommand(ctx) {
  const command = getCommand(ctx.commandName)
  if (!command) return

  // Group-only guard
  if (command.groupOnly && !ctx.isGroup) {
    return ctx.sock.sendMessage(ctx.jid, { text: '❌ Group-only command' })
  }

  // Owner-only guard
  if (command.ownerOnly && !ctx.isOwner) {
    return ctx.sock.sendMessage(ctx.jid, { text: '❌ Owner-only command' })
  }

  // Admin-only guard (lazy resolve)
  if (command.adminOnly) {
    await resolveAdmin(ctx)
    if (!ctx.isAdmin) {
      return ctx.sock.sendMessage(ctx.jid, { text: '❌ Admin-only command' })
    }
  }

  try {
    await command.execute(ctx)
  } catch (err) {
    console.error(`Command error: ${ctx.commandName}`, err)
    await ctx.sock.sendMessage(ctx.jid, { text: '⚠️ Command failed' })
  }
}
