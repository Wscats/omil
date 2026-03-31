/**
 * Omil - Class property transformation.
 * Transforms class property syntax using Babel.
 */

'use strict';

const { transformSync } = require('@babel/core');

/**
 * Transform class property syntax in the given code.
 *
 * @param {string} code - The source code to transform.
 * @returns {{ code: string }} The transformed output.
 */
module.exports = (code) => {
  return transformSync(code, {
    plugins: [
      require('@babel/plugin-proposal-class-properties', { loose: true }),
    ],
  });
};