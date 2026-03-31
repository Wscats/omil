/**
 * Omil - Component render module.
 * Generates the render() call for HTML-based components.
 */

'use strict';

/**
 * Generate a render() call for the component if it's an HTML file.
 *
 * @param {{ templateComponentName: string, sourceObj: object }} option
 * @returns {string} The render call code, or empty string.
 */
module.exports = (option) => {
  const { templateComponentName, sourceObj } = option;

  if (templateComponentName && sourceObj.file === 'html') {
    return `
      render(html\`<${templateComponentName}/>\`, 'body');
    `;
  }
  return '';
};