import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { inlineTag } from '../tag-helpers/inline-tag';
import { getAttribute } from '../utils';

export const a = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = inlineTag()(node, config);
  const href = getAttribute(node, 'href', '');
  
  if (!href) {
    return result;
  }

  return {
    value: `[${result.value}](${href})`,
    width: result.width ? result.width + href.length + 4 : undefined,
    type: 'inline',
    pre: result.pre || null,
    post: result.post || null,
    nodeName: 'a'
  };
}; 