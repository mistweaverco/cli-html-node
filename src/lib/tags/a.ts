import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { blockTag } from '../tag-helpers/block-tag';
import { getAttribute } from '../utils';

export const a = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = blockTag(node, config);
  const href = getAttribute(node, 'href', '');
  
  if (!href) {
    return result;
  }

  return {
    value: `[${result.value}](${href})`,
    width: result.width ? result.width + href.length + 4 : undefined,
  };
}; 