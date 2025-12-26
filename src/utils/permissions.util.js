import { CONFIG } from '../config/index.js'

const adminCache = new Map()
// key: groupJid → { admins: Set<string>, expiresAt: number }

export async function resolveAdmin(ctx) {
  if (!ctx.isGroup) {
    ctx.isAdmin = false
    return ctx
  }

  const now = Date.now()
  const cached = adminCache.get(ctx.jid)

  if (cached && cached.expiresAt > now) {
    ctx.isAdmin = cached.admins.has(ctx.sender)
    return ctx
  }

  try {
    const meta = await ctx.sock.groupMetadata(ctx.jid)
    const admins = new Set(
      meta.participants
        .filter(p => p.admin)
        .map(p => p.id)
    )

    adminCache.set(ctx.jid, {
      admins,
      expiresAt: now + CONFIG.adminCacheTTL
    })

    ctx.isAdmin = admins.has(ctx.sender)
  } catch {
    ctx.isAdmin = false
  }

  return ctx
}
