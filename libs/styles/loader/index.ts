/**
 * Omil - Sass loader compiler (webpack mode).
 * Uses node-sass for SCSS compilation.
 */

import sass from 'node-sass';

/** Compile SCSS to CSS asynchronously. */
export function compileSass(data: string): Promise<string> {
  return new Promise((resolve, reject) => {
    sass.render({ data }, (err: Error | null, result: sass.Result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.css.toString());
      }
    });
  });
}

/** Compile SCSS to CSS synchronously. */
export function compileSassSync(data: string): string {
  return sass.renderSync({
    data,
    outputStyle: 'compressed',
  }).css.toString();
}