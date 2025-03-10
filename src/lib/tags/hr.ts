import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { getAttribute } from '../utils';

export const hr = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const width = config.width || 80;
  const char = getAttribute(node, 'char', '─');
  const value = char.repeat(width);

  return {
    value,
    width,
  };
}; 