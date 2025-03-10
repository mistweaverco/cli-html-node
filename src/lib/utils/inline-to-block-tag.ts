import { RenderResult } from '../../types';

interface InlineTag extends RenderResult {
  pre?: string | null;
  post?: string | null;
}

export const inlineToBlockTag = (tag: InlineTag | null): RenderResult | null => {
  if (!tag) {
    return null;
  }

  return {
    value: [tag.pre, tag.value, tag.post].filter(Boolean).join(''),
    width: tag.width,
  };
}; 