console.log('🚀 index.js started')

import 'dotenv/config'
import { startSocket } from './core/socket.js'

async function main() {
  try {
    await startSocket()
  } catch (err) {
    console.error('Fatal error:', err)
    process.exit(1)
  }
}

main()
