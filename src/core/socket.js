import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from '@whiskeysockets/baileys'
import Pino from 'pino'
import qrcode from 'qrcode-terminal'
import fs from 'fs'

import { handleMessage } from '../handlers/message.handler.js'

let isConnecting = false
const AUTH_DIR = 'auth'

function deleteAuthFolder() {
  if (fs.existsSync(AUTH_DIR)) {
    fs.rmSync(AUTH_DIR, { recursive: true, force: true })
    console.log('🗑️ Auth folder deleted')
  }
}

export async function startSocket() {
  if (isConnecting) return
  isConnecting = true

  console.log('🔌 Starting WhatsApp socket')

  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR)

  const sock = makeWASocket({
    auth: state,
    logger: Pino({ level: 'silent' }),
    markOnlineOnConnect: false,
    browser: ['Ubuntu', 'Chrome', '120.0.0']
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

      // 🔥 LOGGED OUT → DELETE AUTH & EXIT
      if (statusCode === DisconnectReason.loggedOut) {
        console.log('🚫 Logged out by WhatsApp')
        deleteAuthFolder()
        console.log('♻️ Restart required (PM2/systemd will handle)')
        process.exit(0)
      }

      // Safe delayed reconnect (VPS)
      console.log('🔄 Reconnecting in 10 seconds...')
      setTimeout(() => {
        startSocket()
      }, 10000)
    }
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg?.message) return
    await handleMessage(sock, msg)
  })
}
