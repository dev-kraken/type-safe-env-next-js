/**
 * Next.js Instrumentation
 *
 * Runs once when the server initializes (runtime validation).
 * Provides a second layer of validation at server startup.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register(): Promise<void> {
  // Only validate on Node.js runtime (not Edge)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { EnvValidationError, validateEnv } = await import("@/lib/env");

    try {
      validateEnv();

      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log("✅ Environment validated successfully");
      }
    } catch (error) {
      if (error instanceof EnvValidationError) {
        console.error(error.getFormattedMessage());
      } else {
        console.error("❌ Environment validation error:", error);
      }
      process.exit(1);
    }
  }
}
