# Jahezmart Backend

This repository contains the Node.js + TypeScript backend for Jahezmart. It uses Express for the HTTP API, Prisma as the ORM and MongoDB as the database.

This README covers how to set up the backend locally, generate the Prisma client, push the schema to MongoDB, and seed initial product data from `products.json`.

## Project structure (important files)

- `src/` - application source
  - `app.ts` - express app entry
  - `controllers/` - request handlers (users, products)
  - `routes/` - route wiring (users, products, admin)
  - `services/` - business logic (product/user services)
  - `prisma/` - Prisma client wiring
  - `middleware/adminAuth.ts` - simple admin auth middleware using `ADMIN_TOKEN`
- `prisma/schema.prisma` - Prisma schema (MongoDB datasource)
- `prisma/seed.ts` - TypeScript seed script that upserts `products.json` into the DB
- `products.json` - product dataset used by the seed script
- `.env` - environment variables (not committed in general; contains DATABASE_URL, ADMIN_TOKEN, etc.)

## Quick setup (PowerShell)

1. Install dependencies (if not already):

```powershell
cd C:\Users\hacni\OneDrive\Documents\Projects\Jahezmart\jahezmart-backend
npm install
```

2. Create `.env` (or edit) with the environment variables (example below). If you already have `.env`, ensure `DATABASE_URL` points to your MongoDB cluster.

Example `.env` (do NOT commit your real credentials):

```
DATABASE_URL="mongodb+srv://USER:PASS@cluster.mongodb.net/jahezmart?retryWrites=true&w=majority"
PORT=3000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
ADMIN_TOKEN=changeme_admin_token
```

3. Generate the Prisma client and push the schema to MongoDB:

```powershell
npx prisma generate
npx prisma db push
```

4. Seed the products data (reads `products.json` in the backend folder):

```powershell
npm run seed
```

5. Start the dev server:

```powershell
npm run dev
```

The server listens on `http://localhost:3000` by default.

## Available API endpoints

Public product endpoints:
- GET `/api/products` - list products (supports `?page=&limit=&category=`)
- GET `/api/products/:id` - get a product by Prisma `id` or original `jsonId`

Admin endpoints (protected by `ADMIN_TOKEN`):
- POST `/api/admin/products` - create/upsert a product. Send header: `Authorization: Bearer <ADMIN_TOKEN>` or `x-admin-key: <ADMIN_TOKEN>`
- GET `/api/admin/products` - list (admin view)
- GET `/api/admin/products/:id` - get product by id or jsonId
- PUT `/api/admin/products/:id` - update product (id or jsonId)
- DELETE `/api/admin/products/:id` - delete product (id or jsonId)

User endpoints
- `/api/users/*` are available (stubs). See `src/controllers/userController.ts`.

## Notes & recommendations

- Security: The project currently uses a simple `ADMIN_TOKEN` string for admin authorization. For production, replace with a proper authentication and authorization system (JWT + roles or an admin users table).
- Do not commit `.env` to version control. Add it to `.gitignore` and keep a `.env.example` without secrets.
- The `products.json` contains realistic product data used for seeding. You can re-run the seed script to upsert new products.
- Prisma + MongoDB: The Prisma schema is configured for MongoDB in `prisma/schema.prisma`. If you change the schema, run `npx prisma generate` and `npx prisma db push`.

## Troubleshooting

- If `npx prisma generate` errors about TypeScript peers, ensure your dev dependencies include TypeScript >= 5.1 and a recent `ts-node`. Example:

```powershell
npm install --save-dev typescript@^5.9 ts-node@latest @types/node @types/express
```

- If `npm run seed` shows Prisma validation errors, check that `prisma/schema.prisma` and the seed's field names match (e.g. `fullDetails`, `newProduct`).

## Next improvements you might want

- Replace `ADMIN_TOKEN` with proper admin users + JWT authentication
- Add request validation (Zod or Joi) to validate product payloads
- Add unit tests for services and controller behavior
- Add pagination and filtering improvements for product listing

If you'd like, I can:
- Add a `.env.example` and update `.gitignore` to ignore `.env` (recommended)
- Convert admin auth to JWT-based auth and add a simple admin user model
- Add request validation with Zod and update controllers

---

Happy to continue — tell me which improvement you'd like next.
# jahezmart-backend

## Overview
Jahezmart is a Node.js backend application that utilizes Prisma as an ORM to interact with a MongoDB database. This project is structured to provide a clean separation of concerns, making it easy to manage and scale.

## Features
- User registration and management
- RESTful API for user operations
- Integration with MongoDB using Prisma

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd jahezmart-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   - Create a `.env` file in the root directory and add your MongoDB connection string:
     ```
     DATABASE_URL="your_mongodb_connection_string"
     ```

4. Set up the database schema:
   ```
   npx prisma migrate dev --name init
   ```

### Running the Application
To start the application, run:
```
npm run start
```

### API Endpoints
- `POST /users` - Create a new user
- `GET /users/:id` - Retrieve a user by ID
- `PUT /users/:id` - Update a user by ID
- `DELETE /users/:id` - Delete a user by ID

### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

### License
This project is licensed under the MIT License.