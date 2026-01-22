# AppPlanner Backend API (NestJS)

### Overview

This project is the backend API for **AppPlanner**, a small task management application.
It provides authentication, task CRUD operations, filtering, and authorization using JWT.

The backend is built with **NestJS** and **Prisma**, using **SQLite** for simplicity and portability.

---

### Tech Stack

- **NestJS** – Scalable Node.js framework
- **Prisma ORM** – Database access and migrations
- **SQLite** – Lightweight database (local development)
- **JWT (Passport)** – Authentication
- **bcrypt** – Password hashing
- **TypeScript** – Type safety

---

### Authentication

- JWT-based authentication
- Tokens include `userId` and `email`
- Routes protected using `AuthGuard('jwt')`
- Passwords are hashed using bcrypt

---

### Authorization Strategy

All task mutations (`update`, `delete`, `toggle`) enforce ownership:

- Prisma `updateMany` / `deleteMany` is used
- If `count === 0`, access is denied
- Prevents users from modifying other users’ data

This avoids extra queries and keeps authorization simple.

---

### API Features

- User registration & login
- Task CRUD
- Task filtering:
  - completion status
  - category
  - text search
- Secure per-user access

---

### Known Trade-offs

- SQLite is not intended for production scale
- No refresh tokens (simplified auth flow)
- Minimal validation (DTO-based)

These decisions were made intentionally to keep the project focused.

---

### How to Run

```bash
npm install
npx prisma migrate dev
npm run start:dev
```
