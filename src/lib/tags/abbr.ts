import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { blockTag } from '../tag-helpers/block-tag';
import { getAttribute } from '../utils';

const createAbbreviationTag = (tag: string) => (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = blockTag(node, config);
  const title = getAttribute(node, 'title', '');
  
  if (!title) {
    return result;
  }
  
  return {
    value: `${result.value} (${title})`,
    width: (result.width || 0) + title.length + 3,
  };
};

export const abbr = createAbbreviationTag('abbr');
export const acronym = createAbbreviationTag('acronym');
export const dfn = createAbbreviationTag('dfn'); 