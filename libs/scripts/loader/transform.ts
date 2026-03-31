/**
 * Omil - Loader Babel transform.
 * Transforms compiled code for webpack loader output (ES6 → ES5).
 */

import { transform } from '@babel/core';
import type { BabelOptions } from '../../types';

interface TransformResult {
  code: string;
  map: unknown;
}

/**
 * Transform code using Babel with preset-env for webpack loader output.
 */
export default function transformLoader(
  code: string,
  options?: BabelOptions,
): Promise<TransformResult> {
  return new Promise((resolve, reject) => {
    const defaultOption = {
      presets: [['@babel/preset-env']],
    };

    const finalOptions = { ...defaultOption, ...options };

    transform(code, finalOptions, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ code: result?.code || '', map: result?.map });
      }
    });
  });
}