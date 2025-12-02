import { ClientEnvDisplay } from "@/components/client-env-display";
import { ServerEnvDisplay } from "@/components/server-env-display";

/**
 * Server Component - Main Page
 *
 * This page demonstrates the separation between server and client
 * environment variables in Next.js 16+ App Router.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            🔐 Type-safe Environment
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Secure, validated environment variables for Next.js 16+
          </p>
        </div>

        {/* Environment Displays */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Server Component - runs on server only */}
          <ServerEnvDisplay />

          {/* Client Component - runs on client */}
          <ClientEnvDisplay />
        </div>

        {/* Usage Examples */}
        <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            📖 Usage
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <CodeBlock
              title="Server Component"
              code={`import { serverEnv } from "@/lib/env";

// Access sensitive variables
const secret = serverEnv.COOKIE_SECRET;
const isDev = serverEnv.isDev;`}
            />

            <CodeBlock
              title="Client Component"
              code={`"use client";
import { clientEnv } from "@/lib/env";

// Access public variables
const url = clientEnv.NEXT_PUBLIC_APP_URL;
const isDev = clientEnv.isDev;`}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-500">
          Built with Next.js 16 • Zod 4 • TypeScript
        </footer>
      </div>
    </main>
  );
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {title}
      </h3>
      <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
