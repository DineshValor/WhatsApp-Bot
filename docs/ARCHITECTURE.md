# Valor Bot Architecture (v2)

This document explains the internal architecture of Valor Bot v2.

## Design Principles
- Modular
- Replaceable WhatsApp layer
- Zero global state
- Clear separation of concerns

## High-Level Flow

WhatsApp Socket
   ↓
Message Handler
   ↓
Command Router
   ↓
Command Module

## Directory Responsibilities

src/
 ├── core/        → WhatsApp connection & lifecycle
 ├── handlers/    → Message, group, event handlers
 ├── commands/    → User-facing commands
 ├── services/    → External services (DB, AI, APIs)
 ├── utils/       → Pure helper functions
 ├── config/      → Centralized configuration
