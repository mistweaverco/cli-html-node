import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { getAttribute } from '../utils';

export const progress = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const value = parseFloat(getAttribute(node, 'value', '0'));
  const max = parseFloat(getAttribute(node, 'max', '100'));
  const width = config.width || 20;
  
  const percentage = Math.min(100, (value / max) * 100);
  const filledCount = Math.floor((width * percentage) / 100);
  const emptyCount = width - filledCount;
  
  const bar = '█'.repeat(filledCount) + '░'.repeat(emptyCount);
  
  return {
    value: `[${bar}] ${percentage.toFixed(1)}%`,
    width: width + 7,
  };
}; 