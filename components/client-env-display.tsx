"use client";

import { clientEnv } from "@/lib/env";

/**
 * Client Component - Displays client-safe environment variables
 *
 * This component can safely access NEXT_PUBLIC_* variables
 * because they are bundled into the client JavaScript.
 */
export function ClientEnvDisplay() {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">🌐</span>
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100">
          Client Environment
        </h2>
      </div>

      <p className="mb-4 text-sm text-blue-700 dark:text-blue-300">
        These variables are safe to use in the browser. They are bundled into
        the client JavaScript and visible to users.
      </p>

      <div className="space-y-3">
        <EnvRow label="NODE_ENV" value={clientEnv.NODE_ENV} />
        <EnvRow
          label="NEXT_PUBLIC_APP_URL"
          value={clientEnv.NEXT_PUBLIC_APP_URL}
        />
        <EnvRow label="isDev" value={clientEnv.isDev ? "true" : "false"} />
        <EnvRow label="isProd" value={clientEnv.isProd ? "true" : "false"} />
      </div>

      <div className="mt-4 rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          ✅ Safe to use in: Client Components, Server Components, API Routes
        </p>
      </div>
    </div>
  );
}

function EnvRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white px-4 py-2 dark:bg-gray-900">
      <code className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </code>
      <code className="text-sm font-bold text-blue-600 dark:text-blue-400">
        {value}
      </code>
    </div>
  );
}
