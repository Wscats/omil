/**
 * Omil - Export module generator.
 * Generates the class definition and export code for the compiled component.
 */

'use strict';

const { convertToCamelCase, captain, isCaptain } = require('../extension/convert');

/** Regex to detect HOC (Higher-Order Component) export patterns. */
const HOC_EXPORT_REGEX = /export\s+default[\n\s\S]+?class[\s\w]*\{|module.exports\s*=[\n\s\S]*?class\s*\{/g;
const HOC_NAME_REGEX = /export\s+default[\n\s\S]+?class[\s\w]*|module.exports\s*=[\n\s\S]*?class\s*/g;

/**
 * Check if the script contains a Higher-Order Component pattern.
 * HOC patterns have more than 19 non-whitespace characters in the export line.
 */
const isHocPattern = (script) => {
  const match = script.match(HOC_EXPORT_REGEX);
  return match && match[0].replace(/([\s.=])/g, '').length > 19;
};

/**
 * Generate styled-components declaration if style exists.
 */
const styledDecl = (style) => {
  return style ? `const StyledComponents = styled.div\`${style}\`;` : '';
};

/**
 * Generate the export/class definition code for the component.
 *
 * @param {object} option - The compilation context.
 * @returns {string} The generated class definition code.
 */
module.exports = (option) => {
  const { script, style, template, templateLang, templateComponentName } = option;

  const isHtml = templateLang === 'html' || templateLang === 'htm';
  const camelName = templateComponentName
    ? captain(convertToCamelCase(templateComponentName))
    : '';
  const isReactMode = isCaptain(templateComponentName);
  const renderExpr = isHtml ? `(html\`${template}\`)` : template;

  // ── HOC Pattern ──────────────────────────────────────────────────────────

  if (isHocPattern(script)) {
    const hocBase = script.match(HOC_NAME_REGEX)[0];

    if (isReactMode) {
      return `
        ${styledDecl(style)}
        ${hocBase} ${camelName} extends WeElement {
          render() {
            return ${renderExpr}
          }
      `;
    }

    // Omi HOC: replace export with const assignment
    const hocScript = `
      ${hocBase} extends WeElement {
        render(props) {
          return ${renderExpr}
        }
    `.replace(
      /export\s+default([\n\s\S]+?class[\s\w]*)|module.exports(\s*=[\n\s\S]*?class\s*)/g,
      `const ${camelName} = $1$2`,
    );
    return hocScript;
  }

  // ── Standard Component ───────────────────────────────────────────────────

  const componentName = templateComponentName ? '' : 'export default';

  // Check if CSS is already defined in script
  const hasCssInScript = /static\s*css\s*=([^\)]*)/g.test(script);
  const cssDecl = (!hasCssInScript && style !== undefined)
    ? `static css = (\`${style}\`)`
    : '';

  if (isReactMode) {
    // React mode: no static css, use styled-components
    return `
      ${styledDecl(style)}
      ${componentName} class ${camelName} extends WeElement {
        render() {
          return ${renderExpr}
        }
    `;
  }

  // Omi mode: include static css
  return `
    ${componentName} class ${camelName} extends WeElement {
      ${cssDecl}
      render(props) {
        return ${renderExpr}
      }
  `;
};