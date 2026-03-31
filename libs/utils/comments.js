/**
 * Omil - Code comment removal utilities.
 */

'use strict';

/** Regex to match JS string literals and comments. */
const COMMENT_REGEX = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g;

/**
 * Remove single-line (//) and multi-line comments from JavaScript code,
 * while preserving string literals.
 *
 * @param {string} code - The source code string.
 * @returns {string} The code with comments removed.
 */
function deleteCodeComments(code) {
  return code.replace(COMMENT_REGEX, (word) => {
    return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? '' : word;
  });
}

module.exports = { deleteCodeComments };