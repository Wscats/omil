/**
 * Omil - String conversion utilities.
 * Handles kebab-case to camelCase conversion and capitalization.
 */

/**
 * Convert a kebab-case string to camelCase.
 * e.g., "my-component" → "myComponent"
 */
export function convertToCamelCase(str: string): string {
  const parts = str.split('-').filter(Boolean);
  for (let i = 1; i < parts.length; i++) {
    if (parts[i]) {
      parts[i] = parts[i][0].toUpperCase() + parts[i].substring(1);
    }
  }
  return parts.join('');
}

/** Capitalize the first letter of a string. */
export function captain(str: string): string {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

/** Check if the first character of a string is uppercase. */
export function isCaptain(str: string): boolean {
  return /[A-Z]/.test(str.substring(0, 1));
}