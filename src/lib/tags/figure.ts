import { HTMLNode, GlobalConfig, RenderResult } from "../../types";
import { blockTag } from "../tag-helpers/block-tag";

export const figure = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const figcaption = node.childNodes?.find(
    (child) => child.nodeName === "figcaption",
  );
  const otherNodes =
    node.childNodes?.filter((child) => child.nodeName !== "figcaption") || [];

  const contentResult = blockTag({ ...node, childNodes: otherNodes }, config);
  const captionResult = figcaption ? blockTag(figcaption, config) : null;

  if (!captionResult) {
    return contentResult;
  }

  return {
    value: `${contentResult.value}\n[${captionResult.value}]`,
    width: Math.max(contentResult.width || 0, (captionResult.width || 0) + 2),
  };
};
