import { HTMLNode, GlobalConfig, RenderResult, TagRenderer } from "../../types";
import tags from "../tags";

export const renderTag = (
  node: HTMLNode,
  config: GlobalConfig,
  fallbackRenderer?: TagRenderer,
): RenderResult | null => {
  if (!node) {
    return null;
  }

  const renderer = tags[node.nodeName] || fallbackRenderer;
  if (!renderer) {
    console.warn(`No renderer found for tag: ${node.nodeName}`);
    return null;
  }

  return renderer(node, config);
};
