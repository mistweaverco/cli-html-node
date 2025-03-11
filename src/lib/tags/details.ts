import { HTMLNode, GlobalConfig, RenderResult } from "../../types";
import { blockTag } from "../tag-helpers/block-tag";
import { getAttribute } from "../utils";

export const details = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const open = getAttribute(node, "open", "false") === "true";
  const summary = node.childNodes?.find(
    (child) => child.nodeName === "summary",
  );
  const otherNodes =
    node.childNodes?.filter((child) => child.nodeName !== "summary") || [];

  const summaryResult = summary
    ? blockTag(summary, config)
    : { value: "[Details]" };
  const prefix = open ? "▼" : "▶";

  if (!open) {
    return {
      value: `${prefix} ${summaryResult.value}`,
      width: (summaryResult.width || 0) + 2,
    };
  }

  const contentResult = blockTag({ ...node, childNodes: otherNodes }, config);
  return {
    value: `${prefix} ${summaryResult.value}\n${contentResult.value}`,
    width: Math.max((summaryResult.width || 0) + 2, contentResult.width || 0),
  };
};
