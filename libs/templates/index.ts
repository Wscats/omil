/**
 * Omil - Template compiler.
 * Extracts and processes <template> blocks from Omi single-file components.
 */

import * as annotation from '../utils/annotation';
import { convertToCamelCase, captain, isCaptain } from '../scripts/extension/convert';
import cheerio from 'cheerio';
import type { SourceObject, TemplateResult } from '../types';

/**
 * Extract an attribute value from a <template> tag.
 */
function findAttr(templateInTag: string, attr: string): string {
  const openTag = templateInTag.match(/<template[^>]*>/g)![0];
  if (openTag.indexOf(attr) < 0) {
    return '';
  }
  const $ = cheerio.load(openTag);
  return ($('template').attr(attr) || '').trim();
}

/**
 * Compile the <template> section of an Omi single-file component.
 */
export default function compileTemplate(sourceObj: SourceObject): TemplateResult {
  const omi = sourceObj.source;
  const templateInTag = omi.match(/<template[^>]*>([\s\S]*?)<\/template>/g)![0];
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

  return { template, templateLang, templateComponentName, templateFrameworkName };
}