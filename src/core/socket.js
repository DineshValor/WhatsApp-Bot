import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from '@whiskeysockets/baileys'
import Pino from 'pino'

import { handleMessage } from '../handlers/message.handler.js'

import qrcode from 'qrcode-terminal'

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

  sock.ev.on('connection.update', ({ qr, connection }) => {
  if (qr) {
    qrcode.generate(qr, { small: true })
  }
  if (connection === 'open') {
    console.log('✅ WhatsApp connected')
  }
})

    if (connection === 'close') {
      console.log('❌ Connection closed')

      const reason = lastDisconnect?.error?.output?.statusCode
      if (reason !== DisconnectReason.loggedOut) {
        console.log('🔄 Reconnecting...')
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
