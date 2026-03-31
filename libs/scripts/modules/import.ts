/**
 * Omil - Import module generator.
 * Generates the import statements for the compiled component.
 */

import { isCaptain } from '../extension/convert';
import type { CompileContext } from '../../types';

/**
 * Generate import statements based on the component configuration.
 */
export default function generateImports(option: CompileContext): string {
  const {
    templateLang,
    templateComponentName,
    templateFrameworkName,
    style,
    sourceObj,
  } = option;

  const isHtmlLang = templateLang === 'html' || templateLang === 'htm';
  const framework = templateFrameworkName || (isCaptain(templateComponentName) ? 'react' : 'omi');

  // HTML file mode: use global omi object
  if (sourceObj.file === 'html') {
    return `
      const {
        WeElement,
        ${templateComponentName ? 'define,' : ''}
        html,
        h,
        render
      } = omi;
    `;
  }

  // React mode (capitalized component name)
  if (isCaptain(templateComponentName)) {
    return `
      import {
        Component as WeElement,
        ${isHtmlLang ? 'html' : 'createElement as h'}
      } from '${framework}';
      ${style ? 'import styled from "styled-components"' : ''}
    `;
  }

  // Omi mode (lowercase component name)
  return `
    import {
      WeElement,
      ${templateComponentName ? 'define,' : ''}
      ${isHtmlLang ? 'html' : 'h'}
    } from '${framework}';
  `;
}