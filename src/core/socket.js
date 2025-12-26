import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from '@whiskeysockets/baileys'
import Pino from 'pino'

import { handleMessage } from '../handlers/message.handler.js'

export async function startSocket() {
  console.log('🔌 startSocket() called')

  const { state, saveCreds } = await useMultiFileAuthState('auth')
  console.log('🔐 auth state loaded')

  const sock = makeWASocket({
    auth: state,
    logger: Pino({ level: 'silent' }),
    markOnlineOnConnect: false
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', (update) => {
  console.log('📡 connection.update:', Object.keys(update))

  if (update.qr) {
    console.log('📱 QR RECEIVED')
    console.log(update.qr)
  }

  if (update.connection === 'open') {
    console.log('✅ WhatsApp connected')
  }
})

    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode
      if (reason !== DisconnectReason.loggedOut) {
        startSocket()
      }
    }
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg?.message) return
    await handleMessage(sock, msg)
  })
}
