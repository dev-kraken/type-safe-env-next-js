# 🔐 Type-safe Environment for Next.js 16+

A **secure**, **type-safe**, and **validated** environment configuration system for Next.js 16+ App Router with Zod 4.

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Zod](https://img.shields.io/badge/Zod-4+-red?style=flat-square)](https://zod.dev/)

## ✨ Features

- **Type-safe** - Full TypeScript IntelliSense for all environment variables
- **Validated** - Zod schemas validate at build time and runtime
- **Secure** - Server variables blocked from client access
- **Fail-fast** - Clear error messages when variables are missing
- **Zero config** - Works out of the box with Next.js 16+

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/dev-kraken/type-safe-env-next-js.git

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

## 🚀 Quick Start

### Server Components / API Routes

```typescript
import { serverEnv } from "@/lib/env";

// Access server-only variables (secrets, API keys, etc.)
const secret = serverEnv.COOKIE_SECRET;
const isDev = serverEnv.isDev;
```

### Client Components

```typescript
"use client";

import { clientEnv } from "@/lib/env";

// Access public variables (NEXT_PUBLIC_* only)
const appUrl = clientEnv.NEXT_PUBLIC_APP_URL;
const isDev = clientEnv.isDev;
```

## 📁 Project Structure

```
lib/env/
├── schemas.ts      # Zod validation schemas
├── error.ts        # Custom error class
├── server.ts       # Server environment (singleton)
├── client.ts       # Client environment (singleton)
└── index.ts        # Public API exports

next.config.ts      # Build-time validation
instrumentation.ts  # Runtime validation
```

## ⚙️ Configuration

### Adding Server Variables

Edit `lib/env/schemas.ts`:

```typescript
export const serverSchema = z.object({
  NODE_ENV: nodeEnv,
  COOKIE_SECRET: requiredSecret("COOKIE_SECRET", 32),
  
  // Add your server variables here
  DATABASE_URL: requiredUrl("DATABASE_URL"),
  STRIPE_SECRET_KEY: requiredString("STRIPE_SECRET_KEY"),
});
```

### Adding Client Variables

1. Add to schema in `lib/env/schemas.ts`:

```typescript
export const clientSchema = z.object({
  NODE_ENV: nodeEnv,
  NEXT_PUBLIC_APP_URL: requiredUrl("NEXT_PUBLIC_APP_URL"),
  
  // Add your public variables here
  NEXT_PUBLIC_API_URL: requiredUrl("NEXT_PUBLIC_API_URL"),
});
```

2. Add to `clientEnvVars` in `lib/env/client.ts`:

```typescript
const clientEnvVars = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  
  // Add here too (required for client bundling)
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
} as const;
```

## 🔒 Security

| Variable Type | Access | Example |
|---------------|--------|---------|
| Server-only | `serverEnv` | `DATABASE_URL`, `API_SECRET` |
| Client-safe | `clientEnv` | `NEXT_PUBLIC_APP_URL` |

**Server variables** are never exposed to the browser. Attempting to access `serverEnv` in a client component will throw a security error.

## 📋 Environment Variables

Create a `.env.local` file:

```env
# Server-only (never exposed to browser)
COOKIE_SECRET=your-super-secret-key-at-least-32-characters
# STRIPE_SECRET_KEY=sk_test_...
# DATABASE_URL=postgresql://...

# Client-safe (bundled into browser)
NEXT_PUBLIC_APP_URL=http://localhost:3000
# NEXT_PUBLIC_API_URL=https://api.example.com
```

## 🛠️ Validation

### Build-time Validation

Environment variables are validated when you run:

```bash
pnpm build
```

### Runtime Validation

Variables are also validated when the server starts via `instrumentation.ts`.

### Error Output

Missing variables produce clear error messages:

```
❌ Server Environment Validation Failed
────────────────────────────────────────────────────────────

Missing or invalid environment variables:

  ✗ COOKIE_SECRET
    └─ COOKIE_SECRET is required

  ✗ DATABASE_URL
    └─ DATABASE_URL must be a valid URL

────────────────────────────────────────────────────────────

💡 Create a .env.local file with the required variables.
```

## 🧪 Testing

Reset cached environment between tests:

```typescript
import { resetServerEnv, resetClientEnv } from "@/lib/env";

beforeEach(() => {
  resetServerEnv();
  resetClientEnv();
});
```

## 📚 API Reference

### Exports

| Export | Description |
|--------|-------------|
| `serverEnv` | Server-only environment variables |
| `clientEnv` | Client-safe environment variables |
| `validateEnv()` | Validate all environment variables |
| `getServerEnv()` | Get server env (throws if on client) |
| `getClientEnv()` | Get client env |
| `EnvValidationError` | Custom error class |
| `serverSchema` | Zod schema for server variables |
| `clientSchema` | Zod schema for client variables |

### Computed Helpers

Both `serverEnv` and `clientEnv` include:

```typescript
env.isDev   // true if NODE_ENV === "development"
env.isProd  // true if NODE_ENV === "production"
env.isTest  // true if NODE_ENV === "test"
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Dev Kraken](https://github.com/dev-kraken)

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/dev-kraken">Dev Kraken</a>
</p>
