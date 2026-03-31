/**
 * Omil - Main compilation pipeline.
 * Orchestrates template, style, and script compilation for Omi single-file components.
 */

import compileStyle from '../styles/index';
import compileTemplate from '../templates/index';
import compileScript from '../scripts/index';
import generateImports from '../scripts/modules/import';
import generateExport from '../scripts/modules/export';
import generateDefine from '../scripts/modules/define';
import generateRender from '../scripts/modules/render';
import handleStyledComponents from '../templates/styledcomponents/index';
import astTransform from '../scripts/ast/index';
import { compileSass } from '../styles/extension/index';
import classProperty from '../scripts/extension/classProperty';
import type { SourceObject, CompilationResult, CompileContext, AstOption, LoaderCallback } from '../types';

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
 */
async function compileAll(
  sourceObj: SourceObject,
  options: Record<string, unknown> | null,
  callback: ((result: CompilationResult) => void) | LoaderCallback,
): Promise<void> {
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
  } as any);

  let script = rawScript;

  // 4. Handle styled components wrapper
  template = handleStyledComponents({ style, template });

  // 5. Transform template (JSX/TSX via Babel)
  try {
    if (templateLang !== 'html' && templateLang !== 'htm') {
      const transformTemplate = (await import('../scripts/extension/transform')).default;
      const result = await transformTemplate(template, { sourceType: 'script' });
      template = result.code;
    }
  } catch (e) {
    (callback as (result: CompilationResult) => void)({ status: 'fail', allScript: '', e: e as Error });
    throw new Error('Babel compile failed, see issues https://github.com/Wscats/eno-loader/issues');
  }

  // 6. Assemble final script
  try {
    const exportReplaceReg = new RegExp(EXPORT_REGEX, 'g');
    const exportCompileReg = new RegExp('((' + EXPORT_REGEX + ')[\\s\\S]+)', 'g');

    const compileContext: CompileContext = {
      script, isExistScript, scriptLang, template,
      templateLang, templateComponentName, templateFrameworkName,
      style, styleLang, isExistStyle, sourceObj,
    };

    // Generate import header
    const importCode = generateImports(compileContext);

    // Generate export/class body and handle class properties
    const exportCode = script.match(exportCompileReg)![0];
    script = script.replace(exportReplaceReg, generateExport(compileContext));
    script = script.replace(exportCompileReg, classProperty(exportCode).code);

    // Combine: imports + script body + define() + render()
    let allScript = importCode + script +
      generateDefine({ script, templateComponentName }) +
      generateRender({ templateComponentName, sourceObj });

    // 7. AST transformation (JSX → h() calls, cleanup)
    const astOption: AstOption = {
      script, allScript, isExistScript, scriptType,
      scriptLang, template, templateLang, templateComponentName,
      templateFrameworkName, style, styleLang, isExistStyle, sourceObj,
    };
    allScript = (await astTransform(astOption, null)).code;

    // 8. Output
    if (sourceObj.type === 'extension') {
      (callback as (result: CompilationResult) => void)({ status: 'success', allScript, e: null });
    } else {
      const transformLoader = (await import('../scripts/loader/transform')).default;
      const result = await transformLoader(allScript, options as any);
      (callback as LoaderCallback)(null, result.code, result.map);
    }
  } catch (e) {
    (callback as (result: CompilationResult) => void)({ status: 'fail', allScript: '', e: e as Error });
    console.error(e);
    throw new Error('Babel compile failed, see issues https://github.com/Wscats/eno-loader/issues');
  }
}

export default compileAll;