import { serverEnv } from "@/lib/env";

/**
 * Server Component - Displays server-only environment variables
 *
 * This component can safely access sensitive server variables
 * because it only runs on the server and never ships to the client.
 *
 * ⚠️ NEVER add "use client" to this file!
 */
export function ServerEnvDisplay() {
  // Mask sensitive values for display
  const maskedSecret = maskSecret(serverEnv.COOKIE_SECRET);

  return (
    <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">🔒</span>
        <h2 className="text-xl font-semibold text-green-900 dark:text-green-100">
          Server Environment
        </h2>
      </div>

      <p className="mb-4 text-sm text-green-700 dark:text-green-300">
        These variables are only available on the server. They contain sensitive
        data and are never exposed to the browser.
      </p>

      <div className="space-y-3">
        <EnvRow label="NODE_ENV" value={serverEnv.NODE_ENV} />
        <EnvRow label="COOKIE_SECRET" value={maskedSecret} isMasked />
        <EnvRow label="PORT" value={serverEnv.PORT?.toString() ?? "not set"} />
        <EnvRow label="isDev" value={serverEnv.isDev ? "true" : "false"} />
        <EnvRow label="isProd" value={serverEnv.isProd ? "true" : "false"} />
      </div>

      <div className="mt-4 rounded-lg bg-green-100 p-3 dark:bg-green-900">
        <p className="text-xs text-green-800 dark:text-green-200">
          ✅ Safe to use in: Server Components, API Routes, Middleware, Server
          Actions
        </p>
      </div>
    </div>
  );
}

function EnvRow({
  label,
  value,
  isMasked = false,
}: {
  label: string;
  value: string;
  isMasked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white px-4 py-2 dark:bg-gray-900">
      <code className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </code>
      <code
        className={`text-sm font-bold ${
          isMasked
            ? "text-orange-600 dark:text-orange-400"
            : "text-green-600 dark:text-green-400"
        }`}
      >
        {value}
      </code>
    </div>
  );
}

/**
 * Mask a secret for safe display (shows first 4 and last 4 chars)
 */
function maskSecret(secret: string): string {
  if (secret.length <= 8) {
    return "••••••••";
  }
  return `${secret.slice(0, 4)}${"•".repeat(8)}${secret.slice(-4)}`;
}
