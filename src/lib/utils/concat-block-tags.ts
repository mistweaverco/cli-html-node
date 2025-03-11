import { RenderResult } from "../../types";

interface BlockTag extends RenderResult {
  pre?: string | null;
  post?: string | null;
}

export const concatBlockTags = (
  first: BlockTag | null,
  second: BlockTag | null,
): BlockTag | null => {
  if (first == null && second == null) {
    return null;
  }

  if (first == null) {
    return second;
  }

  if (second == null) {
    return first;
  }

  const firstValue = first.value || "";
  const secondValue = second.value || "";
  const firstPost = first.post || "";
  const secondPre = second.pre || "";

  return {
    pre: first.pre,
    value: [firstValue, firstPost, secondPre, secondValue]
      .filter(Boolean)
      .join("\n"),
    post: second.post,
    width: Math.max(first.width || 0, second.width || 0),
  };
};
