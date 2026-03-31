/**
 * Omil - Extension Babel transform.
 * Transforms JSX/TSX template code using Babel with React pragma set to 'h'.
 */

import { transform } from '@babel/core';
import type { BabelOptions } from '../../types';

interface TransformResult {
  code: string;
}

/**
 * Transform code using Babel with JSX support (pragma: h).
 */
export default function transformExtension(
  code: string,
  options?: BabelOptions,
): Promise<TransformResult> {
  return new Promise((resolve, reject) => {
    const defaultOption = {
      plugins: [
        require('@babel/plugin-proposal-class-properties'),
      ],
      presets: [
        [require('@babel/preset-react'), { pragma: 'h' }],
      ],
    };

    const finalOptions = { ...defaultOption, ...options };

    transform(code, finalOptions, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ code: result?.code || '' });
      }
    });
  });
}