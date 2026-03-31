/** Source object passed to the compiler (from webpack loader or programmatic API). */
export interface SourceObject {
  source: string;
  type?: 'extension' | 'loader';
  file?: 'html' | string;
  options?: BabelOptions | null;
  callback?: (result: CompilationResult) => void;
  style?: string;
  styleLang?: string;
  isExistStyle?: boolean;
  templateComponentName?: string;
}

/** Babel transformation options. */
export interface BabelOptions {
  plugins?: unknown[];
  presets?: unknown[];
  comments?: boolean;
  sourceType?: string;
  [key: string]: unknown;
}

/** Result of the compilation pipeline. */
export interface CompilationResult {
  status: 'success' | 'fail';
  allScript: string;
  e: Error | null;
}

/** Result of template compilation. */
export interface TemplateResult {
  template: string;
  templateLang: string;
  templateComponentName: string;
  templateFrameworkName: string;
}

/** Result of style compilation. */
export interface StyleResult {
  style: string;
  isExistStyle: boolean;
  styleLang: string | undefined;
}

/** Result of script compilation. */
export interface ScriptResult {
  script: string;
  isExistScript: boolean;
  scriptType: string;
  scriptLang: string | undefined;
  style: string;
  isExistStyle: boolean;
  styleLang: string | undefined;
}

/** Compilation context passed between pipeline stages. */
export interface CompileContext {
  script: string;
  isExistScript: boolean;
  scriptLang: string | undefined;
  template: string;
  templateLang: string;
  templateComponentName: string;
  templateFrameworkName: string;
  style: string;
  styleLang: string | undefined;
  isExistStyle: boolean;
  sourceObj: SourceObject;
}

/** AST transformation options. */
export interface AstOption extends CompileContext {
  allScript: string;
  scriptType: string;
}

/** Webpack loader callback signature. */
export type LoaderCallback = (
  error: Error | null,
  code?: string,
  map?: unknown,
) => void;

/** Sass compilation result. */
export interface SassResult {
  text?: string;
  css?: Buffer;
}
