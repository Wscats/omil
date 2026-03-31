/**
 * Omil - Style compiler.
 * Extracts and processes <style> blocks from Omi single-file components.
 */

import type { SourceObject, StyleResult } from '../types';

/**
 * Compile the <style> section of an Omi single-file component.
 */
export default function compileStyle(sourceObj: SourceObject): StyleResult {
  const omi = sourceObj.source;
  const type = sourceObj.type;

  let compileSassSync: (sass: string) => string;
  switch (type) {
    case 'extension':
      // In extension mode, pass through without compilation
      compileSassSync = (sass: string) => sass;
      break;
    default: {
      const loader = require('./loader');
      compileSassSync = loader.compileSassSync;
    }
  }

  // Extract <style> tag content
  const styleMatch = omi.match(/<style[^>]*>[\s\S]*?<\/style>/g);
  const styleInTag = styleMatch ? styleMatch[0] : '';

  let style = styleInTag.replace(/<style[^>]*>|<\/style>/g, '');

  // Extract lang attribute from <style> tag
  const styleLang = (() => {
    if (!styleInTag) {
      return undefined;
    }
    const openTag = styleInTag.match(/<style[^>]*>/g)![0];
    return openTag.replace(/<style\s+lang=["']([^>]*)["']\s*>/g, '$1');
  })();

  // Compile SCSS if needed
  if (styleLang === 'scss') {
    style = compileSassSync(style);
  }

  return { isExistStyle: Boolean(styleInTag), styleLang, style };
}