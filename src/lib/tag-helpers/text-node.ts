import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import he from 'he';
import normalizeWhitespace from 'normalize-html-whitespace';

interface TextNodeResult extends RenderResult {
  pre: string | null;
  post: string | null;
  type: 'inline';
  nodeName: string;
}

export const textNode = (tag: HTMLNode, context: GlobalConfig): TextNodeResult => {
  if (context.pre) {
    return {
      pre: null,
      value: he.decode(tag.value || ''),
      post: null,
      type: 'inline',
      nodeName: '#text',
    };
  }

  const normalized = normalizeWhitespace(tag.value || '') || '';
  const chars = [...normalized.replaceAll('\n', ' ')];

  // Extract leading and trailing whitespace
  let pre: string | null = null;
  let post: string | null = null;
  let start = 0;
  let end = chars.length;

  // Handle leading whitespace
  if (chars.length > 0 && [' ', '\n'].includes(chars[0])) {
    pre = chars[0];
    start = 1;
  }

  // Handle trailing whitespace
  if (chars.length > start && [' ', '\n'].includes(chars[end - 1])) {
    post = chars[end - 1];
    end = end - 1;
  }

  // Get the main content
  const value = chars.slice(start, end).join('');

  const result: TextNodeResult = {
    pre,
    value: value.length > 0 ? he.decode(value) : '',
    post,
    type: 'inline',
    nodeName: '#text',
  };

  return result;
}; 