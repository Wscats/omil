/**
 * Omil - Template compiler.
 * Extracts and processes <template> blocks from Omi single-file components.
 */

'use strict';

const annotation = require('../utils/annotation');
const { convertToCamelCase, captain, isCaptain } = require('../scripts/extension/convert');
const cheerio = require('cheerio');

/**
 * Extract an attribute value from a <template> tag.
 *
 * @param {string} templateInTag - The raw <template>...</template> string.
 * @param {string} attr - The attribute name to extract.
 * @returns {string} The attribute value, or empty string.
 */
const findAttr = (templateInTag, attr) => {
  const openTag = templateInTag.match(/<template[^>]*>/g)[0];
  if (openTag.indexOf(attr) < 0) {
    return '';
  }
  const $ = cheerio.load(openTag);
  return ($('template').attr(attr) || '').trim();
};

/**
 * Compile the <template> section of an Omi single-file component.
 *
 * @param {object} sourceObj - The source object containing the raw component.
 * @returns {{ template: string, templateLang: string, templateComponentName: string, templateFrameworkName: string }}
 */
const compileTemplate = (sourceObj) => {
  const omi = sourceObj.source;
  const templateInTag = omi.match(/<template[^>]*>([\s\S]*?)<\/template>/g)[0];
  let template = templateInTag.replace(/<template[^>]*>|<\/template>/g, '');

  const templateLang = findAttr(templateInTag, 'lang');
  const templateComponentName = findAttr(templateInTag, 'name');
  const templateFrameworkName = findAttr(templateInTag, 'framework');

  // Wrap with <StyledComponents> for capitalized component names (React mode)
  if (isCaptain(templateComponentName)) {
    template = `<StyledComponents>${template}</StyledComponents>`;
  }

  // Remove HTML annotations
  template = annotation.remove({ code: template, type: 'html' });

  return {
    template,
    templateLang,
    templateComponentName,
    templateFrameworkName,
  };
};

module.exports = compileTemplate;