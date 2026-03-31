/**
 * Omil - Script compiler.
 * Extracts and processes <script> blocks from Omi single-file components.
 */

import { deleteCodeComments } from '../utils/comments';
import cheerio from 'cheerio';
import { isCaptain } from './extension/convert';
import type { ScriptResult } from '../types';

/** Extended source object with style info for script compilation. */
interface ScriptSourceObject {
  source: string;
  style: string;
  isExistStyle: boolean;
  styleLang: string | undefined;
  templateComponentName: string;
}

/**
 * Compile the <script> section of an Omi single-file component.
 */
export default function compileScript(sourceObj: ScriptSourceObject): ScriptResult {
  const omi = sourceObj.source;
  const { style, isExistStyle, styleLang, templateComponentName } = sourceObj;

  // Extract <script> tag content
  const scriptMatch = omi.match(/<script[^>]*>[\s\S]*?<\/script>/g);
  const scriptInTag = scriptMatch ? scriptMatch[0] : '<script>module.exports=class{}</script>';

  let script = scriptInTag.replace(/<script[^>]*>|<\/script>/g, '');

  // Remove JS comments from script
  script = deleteCodeComments(script);

  // Merge CSS into static css property if component name is not capitalized (Omi mode)
  if (!isCaptain(templateComponentName)) {
    script = script.replace(
      /static\s*css\s*=([^\)]*)/g,
      `static css = \`${style}\`+$1`,
    );
  }

  // Extract script type attribute (e.g., type="text/babel")
  const scriptType = (() => {
    const openTag = scriptInTag.match(/<script[^>]*>/g)![0];
    if (openTag.indexOf('type') < 0) {
      return '';
    }
    const $ = cheerio.load(openTag);
    return ($('script').attr('type') || '').trim();
  })();

  // Extract script lang attribute (e.g., lang="ts")
  const scriptLang = (() => {
    if (!scriptInTag) {
      return undefined;
    }
    return scriptInTag
      .match(/<script[^>]*>/g)![0]
      .replace(/<script\s+lang=["']([^>]*)["']\s*>/g, '$1');
  })();

  return {
    isExistScript: Boolean(scriptInTag),
    scriptType,
    scriptLang,
    script,
    style,
    isExistStyle,
    styleLang,
  };
}