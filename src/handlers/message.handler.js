
import { extractText } from '../utils/message.util.js'
import { handleCommand } from './command.handler.js'

export async function handleMessage(sock, msg) {
  const text = extractText(msg)
  if (!text) return

  if (!text.startsWith('!')) return

  const jid = msg.key.remoteJid
  const [commandName, ...args] = text.slice(1).split(' ')

  await handleCommand({
    sock,
    msg,
    jid,
    text,
    args,
    commandName
  })
}
