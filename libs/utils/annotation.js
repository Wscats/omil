/**
 * Omil - HTML annotation (comment) removal utility.
 */

'use strict';

/**
 * Remove HTML comments from code.
 *
 * @param {string} code - The HTML source code.
 * @returns {string} The code with HTML comments removed.
 */
const removeHtmlComments = (code) => {
  return code.replace(/<!--\s*[\s\S]*?\s*-->/g, '');
};

module.exports = {
  /**
   * Remove annotations from code based on the specified type.
   *
   * @param {{ code: string, type: string }} option - The code and type.
   * @returns {string} The code with annotations removed.
   */
  remove(option) {
    const { code, type } = option;
    switch (type) {
      case 'html':
        return removeHtmlComments(code);
      default:
        return code;
    }
  },
};