import { extractText } from '../utils/message.util.js'
import { handleCommand } from './command.handler.js'
import { CONFIG } from '../config/index.js'

export async function handleMessage(sock, msg) {
  // Ignore system & empty messages
  if (!msg?.message) return

  const text = extractText(msg)
  if (!text) return

  const jid = msg.key.remoteJid
  const fromMe = msg.key.fromMe

  // Safety: ignore self messages
  if (fromMe) return

  // Command handling
  if (!text.startsWith(CONFIG.prefix)) return

  const [commandName, ...args] = text
    .slice(CONFIG.prefix.length)
    .trim()
    .split(/\s+/)

  await handleCommand({
    sock,
    msg,
    jid,
    text,
    args,
    commandName
  })
}
