import { HTMLNode, GlobalConfig, RenderResult, TagRenderer } from "../../types";
import { inlineTag } from "../tag-helpers/inline-tag";

const getClassAttribute = (node: HTMLNode): string | undefined => {
  return node.attrs?.find((attr) => attr.name === "class")?.value;
};

export const span: TagRenderer = (
  node: HTMLNode,
  config: GlobalConfig,
): RenderResult => {
  const className = getClassAttribute(node);
  if (!className) {
    return inlineTag()(node, config);
  }

  const color = className.toLowerCase();
  const themeFunction = config.theme?.[color];
  if (typeof themeFunction !== "function") {
    return inlineTag()(node, config);
  }

  return inlineTag((value: string) => themeFunction(value))(node, config);
};
