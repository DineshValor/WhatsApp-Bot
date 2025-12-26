export const CONFIG = {
  prefix: process.env.PREFIX || '!',
  botName: process.env.BOT_NAME || 'ValorBot',

  // Comma-separated JIDs
  owners: (process.env.BOT_OWNERS || '')
    .split(',')
    .map(v => v.trim())
    .filter(Boolean),

  // Admin cache TTL (ms)
  adminCacheTTL: 60_000
}
