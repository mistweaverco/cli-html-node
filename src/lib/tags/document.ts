import { HTMLNode, GlobalConfig, RenderResult } from "../../types";
import { blockTag } from "../tag-helpers/block-tag";

export const html = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const bodyNode = node.childNodes?.find((child) => child.nodeName === "body");
  if (!bodyNode) {
    return blockTag(node, config);
  }
  return blockTag(bodyNode, config);
};

export const body = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  return blockTag(node, config);
};
