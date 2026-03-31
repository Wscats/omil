/**
 * Omil - AST transformation module.
 * Uses Babel to transform compiled component code (JSX → h() calls, class properties, etc.).
 */

'use strict';

const { transform } = require('@babel/core');

/**
 * Transform the compiled component code using Babel.
 * Handles JSX pragma, class properties, and WeElement class cleanup.
 *
 * @param {object} option - Compilation context with script, template, style info.
 * @param {object|null} options - Additional Babel options to merge.
 * @returns {Promise<{ code: string }>} The transformed code.
 */
module.exports = (option, options) => {
  const { allScript, scriptType } = option;

  return new Promise((resolve, reject) => {
    const presets = [
      [require('@babel/preset-react'), { pragma: 'h' }],
    ];

    if (scriptType === 'text/babel') {
      presets.push(require('@babel/preset-env'));
    }

    /**
     * Remove duplicate render/css methods from WeElement classes.
     * Keeps only the first render method and removes all css methods.
     */
    const weElementClassVisitor = {
      /**
       * Process ClassExpression nodes extending WeElement.
       */
      ClassExpression(path) {
        if (!path.node.superClass || path.node.superClass.name !== 'WeElement') {
          return;
        }
        cleanupWeElementBody(path);
      },

      /**
       * Remove import declarations when scriptType is 'module'.
       */
      ImportDeclaration(path) {
        if (scriptType === 'module') {
          path.remove();
        }
      },

      /**
       * Process ClassDeclaration nodes extending WeElement.
       */
      ClassDeclaration(path) {
        if (!path.node.superClass || path.node.superClass.name !== 'WeElement') {
          return;
        }
        cleanupWeElementBody(path);
      },
    };

    /**
     * Remove duplicate render methods (keep first) and all css methods
     * from a WeElement class body.
     */
    function cleanupWeElementBody(path) {
      const renderMethods = [];
      path.get('body.body').forEach((classMethod) => {
        const name = classMethod.node.key.name;
        if (name === 'render') {
          renderMethods.push(classMethod);
        } else if (name === 'css') {
          classMethod.remove();
        }
      });

      // Keep only the first render method, remove duplicates
      for (let i = 1; i < renderMethods.length; i++) {
        renderMethods[i].remove();
      }
    }

    const defaultOption = {
      plugins: [
        [require('@babel/plugin-proposal-class-properties'), { loose: true }],
        { visitor: weElementClassVisitor },
      ],
      comments: false,
      presets,
    };

    const finalOptions = { ...defaultOption, ...options };

    transform(allScript, finalOptions, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};