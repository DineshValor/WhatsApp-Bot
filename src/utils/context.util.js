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
    ...parsed,
    isAdmin: false, // resolved later if needed
    isOwner: false
  }
}
