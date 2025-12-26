import { extractText } from '../utils/message.util.js'

export async function handleMessage(sock, msg) {
  const text = extractText(msg)
  if (!text) return

  const jid = msg.key.remoteJid
  const isCommand = text.startsWith('!')

  if (isCommand) {
    const cmd = text.slice(1).split(' ')[0]
    if (cmd === 'ping') {
      await sock.sendMessage(jid, { text: 'pong 🏓' })
    }
  }
}
