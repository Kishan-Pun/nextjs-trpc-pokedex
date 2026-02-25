# 🧩 Pokedex – Internship Assignment

A full-stack Pokedex application built with Next.js, Prisma, PostgreSQL, and tRPC.

---

## 🚀 Tech Stack

- Next.js (App Router)
- TypeScript
- Prisma 7
- PostgreSQL
- tRPC + React Query
- Material UI

---

## 📌 Features

### Part 1
- Single Pokémon search
- Reusable `PokemonRow` component

### Part 2
- Multi Pokémon search
- `PokedexTable` component

### Part 3
- Dynamic multi-type filtering (OR logic)
- Modal-based filter UI
- Server-side pagination

---

## 🎁 Bonus

- Case-insensitive search
- Loading skeleton
- Error boundary
- Dynamic type fetching
- Real dataset seeded from PokeAPI
- Responsive layout

---

## ⚙️ Setup

Install dependencies:

```bash
npm install

Add .env:

DATABASE_URL=your_postgres_connection_string

Run migrations:

npx prisma migrate dev

Seed database:

npm run prisma:seed

Run app:

npm run dev
🧠 Architecture

Next.js
↓
tRPC
↓
Prisma ORM
↓
PostgreSQL