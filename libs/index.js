/**
 * Omil - Main entry point.
 * Webpack loader and programmatic API for compiling Omi single-file components.
 */

'use strict';

const compileAll = require('./loaders/index');

/**
 * Omil loader / API entry.
 * When called with an object (programmatic API), returns compiled output.
 * When called as a webpack loader, uses async callback.
 *
 * @param {string|object} source - The source code or source object.
 * @returns {object|void} Compiled output when used programmatically.
 */
module.exports = function (source) {
  // Programmatic API (used by omi-snippets)
  if (typeof source === 'object') {
    const callback = (_info, code) => code;
    compileAll(source, source.options, callback);
    const { compileSass } = require('./styles/extension/index');
    return { compileSass };
  }

  // Webpack loader mode
  const callback = this.async();
  const { getOptions } = require('loader-utils');
  const options = getOptions(this) || {};
  compileAll({ source }, options, callback);
};