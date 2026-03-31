/**
 * Omil - File reading utility.
 * Reads a file asynchronously and returns its contents as a string.
 */

import * as fs from 'fs';

/** Read a file and return its contents as a string. */
export default function getModules(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
}