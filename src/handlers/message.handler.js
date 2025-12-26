
import { extractText } from '../utils/message.util.js'
import { handleCommand } from './command.handler.js'
import { buildContext } from '../utils/context.util.js'
import { CONFIG } from '../config/index.js'

export async function handleMessage(sock, msg) {
  if (!msg?.message) return
  if (msg.key.fromMe) return

  const text = extractText(msg)
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
