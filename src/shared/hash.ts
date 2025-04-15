/**
 * Hash utility functions - only imported by Meta pixel
 */

/**
 * Simple SHA256-like hashing function for client-side use
 * Note: This is a simplified implementation for demonstration
 */
export function hashValue(value: string): string {
  if (!value) return "";

  // Simple hash function (not cryptographically secure)
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Convert to hex string
  return Math.abs(hash).toString(16).padStart(8, "0");
}

/**
 * Hash user data for privacy
 */
export function hashUserData(data: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      // Only hash string values
      if (key === "email") {
        result[key] = hashValue(value.toLowerCase().trim());
      } else if (key === "phone") {
        // Remove non-numeric characters before hashing
        result[key] = hashValue(value.replace(/\D/g, ""));
      } else {
        result[key] = hashValue(value);
      }
    } else {
      // Pass through non-string values
      result[key] = value;
    }
  }

  return result;
}
