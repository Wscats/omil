/**
 * Omil - Component definition module.
 * Generates define() or export default calls for the compiled component.
 */

'use strict';

const { convertToCamelCase, captain, isCaptain } = require('../extension/convert');

/** Regex to detect HOC (Higher-Order Component) patterns in exports. */
const HOC_REGEX = /export\s+default[\n\s\S]+?class[\s\w]*\{|module.exports\s*=[\n\s\S]*?class\s*\{/g;

/**
 * Generate the component definition code.
 *
 * @param {{ templateComponentName: string, script: string }} option
 * @returns {string} The define/export code snippet.
 */
module.exports = (option) => {
  const { templateComponentName, script } = option;

  if (!templateComponentName) {
    return '';
  }

  const camelName = captain(convertToCamelCase(templateComponentName));
  const isHoc = script.match(HOC_REGEX);

  // HOC pattern: just add a comment
  if (isHoc && isHoc[0].replace(/([\s.=])/g, '').length > 19) {
    return `\n// export default ${camelName}\n`;
  }

  // React mode (capitalized name): use export default
  if (isCaptain(templateComponentName)) {
    return `\nexport default ${camelName}\n`;
  }

  // Omi mode: use define()
  return `\ndefine('${templateComponentName}', ${camelName});\n`;
};