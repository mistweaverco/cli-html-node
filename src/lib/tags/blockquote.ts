import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { blockTag } from '../tag-helpers/block-tag';
import { getAttribute } from '../utils';

export const blockquote = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = blockTag(node, config);
  const cite = getAttribute(node, 'cite', '');
  
  const lines = result.value.split('\n').map(line => `> ${line}`);
  if (cite) {
    lines.push(`> — ${cite}`);
  }
  
  return {
    value: lines.join('\n'),
    width: Math.max(...lines.map(line => line.length)),
  };
}; 