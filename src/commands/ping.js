export default {
  name: 'ping',
  description: 'Health check command',
  async execute({ sock, jid }) {
    await sock.sendMessage(jid, { text: 'pong 🏓' })
  }
}
