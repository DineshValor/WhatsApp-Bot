# Valor Bot v2 Migration

This document describes the migration from the legacy Valor Bot
to the revived v2 architecture.

## Why this migration exists
- Original bot was built on legacy Baileys
- WhatsApp protocol changes broke compatibility
- This revamp modernizes the entire stack

## Key Changes
- Baileys moved to @whiskeysockets/baileys
- Node.js >= 18 required
- New modular architecture under /src
- Old session/auth files are NOT compatible

## Install (when running locally)
npm install --package-lock-only
mv package.next.json package.json
npm install
