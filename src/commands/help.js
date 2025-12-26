import { listCommands } from './meta.js'

export default {
  name: 'help',
  description: 'Show available commands',
  async execute({ sock, jid }) {
    const cmds = listCommands()
      .map(c => `• !${c.name} – ${c.description || 'No description'}`)
      .join('\n')

    await sock.sendMessage(jid, {
      text: `📖 Available Commands:\n\n${cmds}`
    })
  }
}
