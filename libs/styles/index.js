/**
 * Omil - Style compiler.
 * Extracts and processes <style> blocks from Omi single-file components.
 */

'use strict';

/**
 * Compile the <style> section of an Omi single-file component.
 *
 * @param {object} sourceObj - The source object containing the raw component.
 * @returns {{ style: string, isExistStyle: boolean, styleLang: string }}
 */
const compileStyle = (sourceObj) => {
  const omi = sourceObj.source;
  const type = sourceObj.type;

  let compileSassSync = null;
  switch (type) {
    case 'extension':
      // In extension mode, pass through without compilation
      compileSassSync = (sass) => sass;
      break;
    default:
      compileSassSync = require('./loader').compileSassSync;
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
    const openTag = styleInTag.match(/<style[^>]*>/g)[0];
    return openTag.replace(/<style\s+lang=["']([^>]*)["']\s*>/g, '$1');
  })();

  // Compile SCSS if needed
  if (styleLang === 'scss') {
    style = compileSassSync(style);
  }

  return {
    isExistStyle: Boolean(styleInTag),
    styleLang,
    style,
  };
};

module.exports = compileStyle;