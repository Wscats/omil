/**
 * Omil - Main entry point.
 * Webpack loader and programmatic API for compiling Omi single-file components.
 */

import compileAll from './loaders/index';
import { compileSass } from './styles/extension/index';
import type { SourceObject, CompilationResult } from './types';

/** Return type for programmatic API. */
interface OmilApiResult {
  compileSass: typeof compileSass;
}

/**
 * Omil loader / API entry.
 * When called with an object (programmatic API), returns compiled output.
 * When called as a webpack loader, uses async callback.
 */
function omil(this: any, source: string | SourceObject): OmilApiResult | void {
  // Programmatic API (used by omi-snippets)
  if (typeof source === 'object') {
    const callback = (_info: CompilationResult, code: string): string => code;
    compileAll(source, source.options ?? null, callback as any);
    return { compileSass };
  }

  // Webpack loader mode
  const callback = this.async();
  const { getOptions } = require('loader-utils');
  const options = getOptions(this) || {};
  compileAll({ source }, options, callback);
}

export = omil;