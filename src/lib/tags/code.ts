import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { blockTag } from '../tag-helpers/block-tag';
import { getAttribute } from '../utils';

export const code = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = blockTag(node, config);
  return {
    value: `\`${result.value}\``,
    width: (result.width || 0) + 2,
  };
};

export const pre = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const language = getAttribute(node, 'language', '');
  const result = blockTag(node, config);
  const lines = result.value.split('\n');
  
  // Add language tag if specified
  const header = language ? `\`\`\`${language}` : '```';
  
  return {
    value: [
      header,
      ...lines,
      '```'
    ].join('\n'),
    width: Math.max(header.length, ...lines.map(line => line.length), 3),
  };
}; 