import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { renderTag } from '../utils/render-tag';
import { concatTwoInlineTags } from '../utils/concat-inline-tags';

export interface InlineTagResult extends RenderResult {
  pre: string | null;
  post: string | null;
  type: 'inline';
  nodeName: string;
  value: string;
}

type WrapperFunction = (value: string) => string;

export const inlineTag = (wrapper?: WrapperFunction) => (tag: HTMLNode, config: GlobalConfig): InlineTagResult => {
  if (!tag.childNodes || tag.childNodes.length === 0) {
    const value = '';
    return {
      value: wrapper ? wrapper(value) : value,
      type: 'inline' as const,
      nodeName: tag.nodeName,
      pre: null,
      post: null,
    };
  }

  const value = tag.childNodes.reduce<InlineTagResult>((result, nodeTag) => {
    const nodeResult = renderTag(nodeTag, config);
    if (!nodeResult) return result;

    const inlineNodeTag: InlineTagResult = {
      value: nodeResult.value || '',
      type: 'inline' as const,
      nodeName: tag.nodeName,
      pre: nodeResult.pre || null,
      post: nodeResult.post || null,
    };

    const combined = concatTwoInlineTags(result, inlineNodeTag);
    if (!combined) {
      return {
        value: '',
        pre: null,
        post: null,
        type: 'inline' as const,
        nodeName: tag.nodeName,
      };
    }

    return {
      value: wrapper ? wrapper(combined.value || '') : (combined.value || ''),
      pre: combined.pre || null,
      post: combined.post || null,
      type: 'inline' as const,
      nodeName: tag.nodeName,
    };
  }, {
    value: '',
    pre: null,
    post: null,
    type: 'inline' as const,
    nodeName: tag.nodeName,
  });

  return value;
}; 