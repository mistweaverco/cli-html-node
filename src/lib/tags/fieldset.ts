import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { blockTag } from '../tag-helpers/block-tag';

export const fieldset = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const legend = node.childNodes?.find(child => child.nodeName === 'legend');
  const otherNodes = node.childNodes?.filter(child => child.nodeName !== 'legend') || [];
  
  const legendResult = legend ? blockTag(legend, config) : null;
  const contentResult = blockTag({ ...node, childNodes: otherNodes }, config);
  
  const value = legendResult
    ? `[${legendResult.value}]\n${contentResult.value}`
    : contentResult.value;
  
  return {
    value,
    width: Math.max(
      legendResult ? (legendResult.width || 0) + 2 : 0,
      contentResult.width || 0
    ),
  };
}; 