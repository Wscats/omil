/**
 * Omil - Styled Components handler.
 * Strips <StyledComponents> wrapper when no style is present.
 */

'use strict';

/**
 * Handle styled components in the template.
 * If style exists, keep the wrapper; otherwise strip it.
 *
 * @param {{ style: string, template: string }} options
 * @returns {string} The processed template.
 */
module.exports = ({ style, template }) => {
  if (style) {
    return template;
  }
  return template.replace(/<StyledComponents>([\n\s\S]*)<\/StyledComponents>/g, '$1');
};
