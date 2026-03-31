/**
 * Omil - AST transformation module.
 * Uses Babel to transform compiled component code (JSX → h() calls, class properties, etc.).
 */

import { transform } from '@babel/core';
import type { AstOption, BabelOptions } from '../../types';

interface AstResult {
  code: string;
}

/**
 * Remove duplicate render/css methods from WeElement classes.
 * Keeps only the first render method and removes all css methods.
 */
function cleanupWeElementBody(path: any): void {
  const renderMethods: any[] = [];
  path.get('body.body').forEach((classMethod: any) => {
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

/**
 * Transform the compiled component code using Babel.
 * Handles JSX pragma, class properties, and WeElement class cleanup.
 */
export default function astTransform(
  option: AstOption,
  options: BabelOptions | null,
): Promise<AstResult> {
  const { allScript, scriptType } = option;

  return new Promise((resolve, reject) => {
    const presets: unknown[] = [
      [require('@babel/preset-react'), { pragma: 'h' }],
    ];

    if (scriptType === 'text/babel') {
      presets.push(require('@babel/preset-env'));
    }

    /** Babel visitor to clean up WeElement classes. */
    const weElementClassVisitor = {
      ClassExpression(path: any): void {
        if (!path.node.superClass || path.node.superClass.name !== 'WeElement') {
          return;
        }
        cleanupWeElementBody(path);
      },

      ImportDeclaration(path: any): void {
        if (scriptType === 'module') {
          path.remove();
        }
      },

      ClassDeclaration(path: any): void {
        if (!path.node.superClass || path.node.superClass.name !== 'WeElement') {
          return;
        }
        cleanupWeElementBody(path);
      },
    };

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
        resolve({ code: result?.code || '' });
      }
    });
  });
}