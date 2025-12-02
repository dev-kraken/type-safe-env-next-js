/**
 * Next.js Configuration with Environment Validation
 *
 * Validates all environment variables before the build starts.
 * Fails fast with clear error messages if validation fails.
 *
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js
 */

import type { NextConfig } from "next";

import { EnvValidationError, validateEnv } from "@/lib/env";

// ============================================================================
// Environment Validation (Build Time)
// ============================================================================

try {
  validateEnv();
} catch (error) {
  if (error instanceof EnvValidationError) {
    console.error(error.getFormattedMessage());
  } else {
    console.error("❌ Environment validation error:", error);
  }
  process.exit(1);
}

// ============================================================================
// Next.js Configuration
// ============================================================================

const nextConfig: NextConfig = {
  /* Add your config options here */
};

export default nextConfig;
