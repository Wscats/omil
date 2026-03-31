/**
 * Omil - Sass extension compiler (browser/extension mode).
 * Uses the embedded sass.sync.js for SCSS compilation.
 */

import type { SassResult } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sass = require('./sass.sync.js') as {
  compile: (data: string, options: Record<string, unknown>, callback: (result: SassResult) => void) => void;
  style: Record<string, unknown>;
};

/** Compile SCSS to CSS asynchronously using the embedded Sass compiler. */
export function compileSass(data: string): Promise<SassResult> {
  return new Promise((resolve) => {
    sass.compile(data, {
      style: sass.style.compressed,
    }, (result: SassResult) => {
      resolve(result);
    });
  });
}