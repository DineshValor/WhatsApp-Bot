# Valor Bot v2 Migration

This branch introduces a full revival of Valor Bot using the
modern Baileys stack.

## Key Changes
- Baileys moved to @whiskeysockets/baileys
- Node.js >= 18 required
- New modular architecture under /src
- Old session/auth files are NOT compatible

## Install (when running locally)
npm install --package-lock-only
mv package.next.json package.json
npm install
