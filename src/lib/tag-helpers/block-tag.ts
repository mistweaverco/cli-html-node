import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { renderTag } from '../utils/render-tag';
import { concatTwoInlineTags } from '../utils/concat-inline-tags';

export const blockTag = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  if (!node.childNodes || node.childNodes.length === 0) {
    return { value: '' };
  }

  const childResults = node.childNodes
    .map(child => renderTag(child, config))
    .filter((result): result is RenderResult => result !== null);

  // Combine child results, preserving block and inline flow
  const combinedValue = childResults.reduce((acc, result, index) => {
    const isInline = result.type === 'inline';
    const prevIsInline = index > 0 && childResults[index - 1].type === 'inline';
    
    if (isInline && prevIsInline) {
      // Use concat for inline elements to preserve whitespace
      const prevResult = childResults[index - 1];
      const combined = concatTwoInlineTags(prevResult, result);
      if (combined) {
        return acc.slice(0, -prevResult.value.length) + combined.value;
      }
    }
    
    // Add single newline between block elements
    const separator = isInline && prevIsInline ? '' : '\n';
    return (acc ? acc + separator : '') + result.value;
  }, '');

  return {
    value: combinedValue.trim(),
    width: config.width,
  };
}; 
