/**
 * Omil - Class property transformation.
 * Transforms class property syntax using Babel.
 */

import { transformSync } from '@babel/core';

interface TransformResult {
  code: string;
}

/**
 * Transform class property syntax in the given code.
 */
export default function classProperty(code: string): TransformResult {
  const result = transformSync(code, {
    plugins: [
      require('@babel/plugin-proposal-class-properties'),
    ],
  });
  return { code: result?.code || code };
}