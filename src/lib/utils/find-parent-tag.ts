import { HTMLNode } from "../../types";

export const findParentTag = (
  node: HTMLNode,
  tagName: string,
): HTMLNode | null => {
  if (!node) {
    return null;
  }

  if (node.nodeName === tagName) {
    return node;
  }

  if (!node.parentNode) {
    return null;
  }

  return findParentTag(node.parentNode, tagName);
};
