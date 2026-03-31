/**
 * Omil - Component render module.
 * Generates the render() call for HTML-based components.
 */

import type { SourceObject } from '../../types';

interface RenderOption {
  templateComponentName: string;
  sourceObj: SourceObject;
}

/**
 * Generate a render() call for the component if it's an HTML file.
 */
export default function generateRender(option: RenderOption): string {
  const { templateComponentName, sourceObj } = option;

  if (templateComponentName && sourceObj.file === 'html') {
    return `\n      render(html\`<${templateComponentName}/>\`, 'body');\n    `;
  }
  return '';
}