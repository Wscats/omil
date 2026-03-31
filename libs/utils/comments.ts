/**
 * Omil - Code comment removal utilities.
 */

'use strict';

/** Regex to match JS string literals and comments. */
const COMMENT_REGEX = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g;

/**
 * Remove single-line (//) and multi-line comments from JavaScript code,
 * while preserving string literals.
 */
export function deleteCodeComments(code: string): string {
  return code.replace(COMMENT_REGEX, (word: string) => {
    return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? '' : word;
  });
}