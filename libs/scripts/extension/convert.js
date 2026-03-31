/**
 * Omil - String conversion utilities.
 * Handles kebab-case to camelCase conversion and capitalization.
 */

'use strict';

/**
 * Convert a kebab-case string to camelCase.
 * e.g., "my-component" → "myComponent"
 *
 * @param {string} str - The kebab-case string.
 * @returns {string} The camelCase string.
 */
const convertToCamelCase = (str) => {
  const parts = str.split('-').filter(Boolean);
  for (let i = 1; i < parts.length; i++) {
    if (parts[i]) {
      parts[i] = parts[i][0].toUpperCase() + parts[i].substring(1);
    }
  }
  return parts.join('');
};

/**
 * Capitalize the first letter of a string.
 *
 * @param {string} str - The input string.
 * @returns {string} The capitalized string.
 */
const captain = (str) => {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
};

/**
 * Check if the first character of a string is uppercase.
 *
 * @param {string} str - The input string.
 * @returns {boolean} True if the first character is uppercase.
 */
const isCaptain = (str) => {
  return /[A-Z]/.test(str.substring(0, 1));
};

module.exports = {
  convertToCamelCase,
  captain,
  isCaptain,
};