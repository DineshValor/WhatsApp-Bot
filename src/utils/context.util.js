import { CONFIG } from '../config/index.js'

export function buildContext(sock, msg, parsed) {
  const jid = msg.key.remoteJid
  const sender = msg.key.participant || jid
  const isGroup = jid.endsWith('@g.us')

  return {
    sock,
    msg,
    jid,
    sender,
    isGroup,
    config: CONFIG,
    isAdmin: false,
    isOwner: CONFIG.owners.includes(sender),
    ...parsed
  }
}
