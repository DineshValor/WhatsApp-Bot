import { extractText } from '../utils/message.util.js'
import { handleCommand } from './command.handler.js'
import { buildContext } from '../utils/context.util.js'
import { CONFIG } from '../config/index.js'

export async function handleMessage(sock, msg) {
  if (!msg?.message) return

  // Ignore WhatsApp junk
  if (msg.key.remoteJid === 'status@broadcast') return

  // Ignore self messages
  if (msg.key.fromMe) return

  const text = extractText(msg)
  if (!text) return

  if (!text.startsWith(CONFIG.prefix)) return

  const [commandName, ...args] = text
    .slice(CONFIG.prefix.length)
    .trim()
    .split(/\s+/)

  const ctx = buildContext(sock, msg, {
    text,
    args,
    commandName
  })

  await handleCommand(ctx)
}
