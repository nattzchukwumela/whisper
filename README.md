# Whisper 🕊️
An anonymous messaging platform built with **Next.js**, **Prisma**, and **PostgreSQL**.

🌍 **Live Demo**: [https://whisper-lemon.vercel.app](https://whisper-lemon.vercel.app)


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
pnpm install

# Start development server
pnpm dev

# Setup .env

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development

# Run database migrations
pnpx prisma migrate dev

# project setup

whisper/
├── .github/workflows/ # GitHub Actions (CI/CD)
├── prisma/ # Prisma schema & migrations
├── public/ # Static assets (icons, manifest, etc.)
├── src/
│ ├── app/
│ │ ├── anonymous_message/ # Handles sending anonymous messages
│ │ ├── api/ # API routes
│ │ ├── app_style/ # Global/shared styles
│ │ ├── auth/ # Authentication (NextAuth + JWT handling)
│ │ ├── component/ # Reusable UI components
│ │ ├── dashboard/ # User dashboard
│ │ ├── landing_page/ # Public landing page
│ │ ├── r/[uniqueLink]/ # Dynamic route for unique user links
│ │ ├── u/[uniqueLink]/ # User’s unique anonymous link page
│ │ ├── layout.tsx # Root layout
│ │ ├── middleware.ts # Middleware (auth checks, etc.)
│ │ ├── page.tsx # Main entry page
│ │ ├── globals.css # Global styles
│ │ └── site.webmanifest # PWA manifest
│ │
│ ├── lib/ # Utility functions (auth helpers, db utils, etc.)
│ └── util/ # Custom helper utilities
│
├── .env # Environment variables
├── next.config.mjs # Next.js configuration
├── eslint.config.js # ESLint config
└── README.md # Project documentation


## 🛠️ Tech Stack
Frontend: Next.js 14 (App Router)

Backend: NextAuth (custom token handling)

Database: PostgreSQL + Prisma

Styling: CSS

## 📌 Roadmap

 Add message moderation tools

 Add user dashboard for managing received messages

 Add message recieve page needs proper ui updates

 Add Proper light and dark theme Features

 Enable reactions/emojis on messages

 Deploy to Vercel with production PostgreSQL

 ## 🤝 Contributing

 Contributions are welcome!

 Fork the repo

 Create your feature branch: git checkout -b feature/your-feature

 Commit your changes: git commit -m 'Add new feature'

 Push to branch: git push origin feature/your-feature

 Open a Pull Request


## 📜 License

This project is licensed under the [MIT License](LICENSE).


 🙌 Acknowledgements

 Next.js

 Prisma

 NextAuth.js

 PostgreSQL
