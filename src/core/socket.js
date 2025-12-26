import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from '@whiskeysockets/baileys'
import Pino from 'pino'
import qrcode from 'qrcode-terminal'

import { handleMessage } from '../handlers/message.handler.js'

let isConnecting = false

export async function startSocket() {
  if (isConnecting) return
  isConnecting = true

  console.log('🔌 Starting WhatsApp socket')

  const { state, saveCreds } = await useMultiFileAuthState('auth')

  const sock = makeWASocket({
    auth: state,
    logger: Pino({ level: 'silent' }),
    markOnlineOnConnect: false
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', ({ connection, qr, lastDisconnect }) => {
    if (qr) {
      console.log('\n📱 Scan QR below:\n')
      qrcode.generate(qr, { small: true })
    }

    if (connection === 'open') {
      console.log('✅ WhatsApp connected')
      isConnecting = false
    }

    if (connection === 'close') {
      isConnecting = false

      const statusCode =
        lastDisconnect?.error?.output?.statusCode

      console.log('❌ Connection closed:', statusCode)

      // Do NOT reconnect if logged out
      if (statusCode === DisconnectReason.loggedOut) {
        console.log('🚫 Logged out.')
        console.log('👉 Delete auth folder and restart:')
        console.log('   rm -rf auth && node src/index.js')
        return
      }

      console.log('🔄 Reconnecting in 5 seconds...')
      setTimeout(() => {
        startSocket()
      }, 5000)
    }
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg?.message) return
    await handleMessage(sock, msg)
  })
}
