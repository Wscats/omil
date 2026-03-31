/**
 * Omil - Styled Components handler.
 * Strips <StyledComponents> wrapper when no style is present.
 */

interface StyledComponentsOption {
  style: string;
  template: string;
}

/**
 * Handle styled components in the template.
 * If style exists, keep the wrapper; otherwise strip it.
 */
export default function handleStyledComponents({ style, template }: StyledComponentsOption): string {
  if (style) {
    return template;
  }
  return template.replace(/<StyledComponents>([\n\s\S]*)<\/StyledComponents>/g, '$1');
}
