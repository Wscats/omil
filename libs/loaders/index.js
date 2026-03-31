/**
 * Omil - Main compilation pipeline.
 * Orchestrates template, style, and script compilation for Omi single-file components.
 */

'use strict';

const compileStyle = require('../styles/index');
const compileTemplate = require('../templates/index');
const compileScript = require('../scripts/index');
const modulesStart = require('../scripts/modules/import');
const modulesEnd = require('../scripts/modules/export');
const defineComponent = require('../scripts/modules/define');
const renderComponent = require('../scripts/modules/render');
const handleStyledComponents = require('../templates/styledcomponents');
const ast = require('../scripts/ast');
const { compileSass } = require('../styles/extension/index');
const classProperty = require('../scripts/extension/classProperty');

/** Regex to match export/module.exports class patterns. */
const EXPORT_REGEX = 'export\\s+default\\s*\\{|module.exports\\s*=\\s*\\{|export\\s+default\\s*class\\s*\\{|module.exports\\s*=\\s*class\\s*\\{|export\\s+default[\\n\\s\\S]+?class[\\s\\w]*\\{|module.exports\\s*=[\\n\\s\\S]*?class\\s*\\{';

/**
 * Compile an Omi single-file component through the full pipeline:
 * 1. Extract and compile <template>, <style>, <script> sections
 * 2. Handle SCSS compilation for extension mode
 * 3. Transform JSX templates via Babel
 * 4. Generate import/export/define/render module code
 * 5. Run AST transformations
 * 6. Optionally transpile ES6 → ES5 for webpack loader mode
 *
 * @param {object} sourceObj - The source object containing the raw component.
 * @param {object} options - Compilation options (e.g., Babel config).
 * @param {Function} callback - Callback with (error, code, map) or status object.
 */
const compileAll = async (sourceObj, options, callback) => {
  // 1. Extract template
  let { template, templateLang, templateComponentName, templateFrameworkName } =
    compileTemplate(sourceObj);

  // 2. Extract and compile style
  let { style, isExistStyle, styleLang } = compileStyle(sourceObj);

  // Handle SCSS in extension mode
  if (sourceObj.type === 'extension' && styleLang === 'scss') {
    const sassResult = await compileSass(style);
    style = (sassResult.text || '').replace(/[\r\n]/g, '');
  }

  // 3. Extract and compile script
  const {
    script: rawScript,
    isExistScript,
    scriptType,
    scriptLang,
  } = compileScript({
    ...sourceObj,
    style,
    styleLang,
    isExistStyle,
    templateComponentName,
  });

  let script = rawScript;

  // 4. Handle styled components wrapper
  template = handleStyledComponents({ style, template });

  // 5. Transform template (JSX/TSX via Babel)
  try {
    if (templateLang !== 'html' && templateLang !== 'htm') {
      const transformTemplate = require('../scripts/extension/transform');
      const result = await transformTemplate(template, { sourceType: 'script' });
      template = result.code;
    }
  } catch (e) {
    callback({ status: 'fail', allScript: '', e });
    throw new Error('Babel compile failed, see issues https://github.com/Wscats/eno-loader/issues');
  }

  // 6. Assemble final script
  try {
    const exportReplaceReg = new RegExp(EXPORT_REGEX, 'g');
    const exportCompileReg = new RegExp('((' + EXPORT_REGEX + ')[\\s\\S]+)', 'g');

    const compileContext = {
      script, isExistScript, scriptLang, template,
      templateLang, templateComponentName, templateFrameworkName,
      style, styleLang, isExistStyle, sourceObj,
    };

    // Generate import header
    const importCode = modulesStart(compileContext);

    // Generate export/class body and handle class properties
    const exportCode = script.match(exportCompileReg)[0];
    script = script.replace(exportReplaceReg, modulesEnd(compileContext));
    script = script.replace(exportCompileReg, classProperty(exportCode).code);

    // Combine: imports + script body + define() + render()
    let allScript = importCode + script +
      defineComponent({ script, templateComponentName }) +
      renderComponent({ templateComponentName, sourceObj });

    // 7. AST transformation (JSX → h() calls, cleanup)
    allScript = (await ast({
      script, allScript, isExistScript, scriptType,
      scriptLang, template, templateLang, templateComponentName,
      style, styleLang, isExistStyle,
    }, null)).code;

    // 8. Output
    if (sourceObj.type === 'extension') {
      callback({ status: 'success', allScript, e: null });
    } else {
      const transformLoader = require('../scripts/loader/transform');
      const result = await transformLoader(allScript, options);
      callback(null, result.code, result.map);
    }
  } catch (e) {
    callback({ status: 'fail', allScript: '', e });
    console.error(e);
    throw new Error('Babel compile failed, see issues https://github.com/Wscats/eno-loader/issues');
  }
};

module.exports = compileAll;