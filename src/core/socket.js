const sock = makeWASocket({
  auth: state,
  markOnlineOnConnect: false
})

sock.ev.on('connection.update', ({ connection, qr, lastDisconnect }) => {
  if (qr) {
    console.log('\n📱 Scan this QR code:\n')
    console.log(qr)
  }

  if (connection === 'open') {
    console.log('✅ WhatsApp connected')
  }

  if (connection === 'close') {
    const reason = lastDisconnect?.error?.output?.statusCode
    if (reason !== DisconnectReason.loggedOut) {
      startSocket()
    }
  }
})
