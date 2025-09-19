# Whisper 🕊️
An anonymous messaging platform built with **Next.js**, **Prisma**, and **PostgreSQL**.

Whisper allows users to create a **unique link** they can share with others. Anyone with the link can send the user an **anonymous private message**. Messages must be categorized (e.g. *love, anxiety, happy, sad, venting*) before submission, ensuring better organization and context.

---

## ✨ Features
- 🔗 **Unique User Links** — each user gets a personal link for receiving messages.
- 📨 **Anonymous Messaging** — senders don’t need an account.
- 🏷️ **Message Categories** — messages must belong to a category (*love, anxiety, happy, sad, venting*, etc.).
- 🔑 **Authentication** — implemented with NextAuth, with **custom access & refresh token handling**.
- 🗄️ **Database** — powered by **PostgreSQL** with **Prisma ORM**.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/nattzchukwumela/whisper.git
cd whisper

# Install dependecies
pnpm Install

# Start development server
pnpm dev
