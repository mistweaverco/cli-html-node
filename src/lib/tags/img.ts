import { HTMLNode, GlobalConfig, RenderResult } from "../../types";
import { getAttribute } from "../utils";

export const img = (node: HTMLNode, _config: GlobalConfig): RenderResult => {
  const alt = getAttribute(node, "alt", "");
  const src = getAttribute(node, "src", "");

  return {
    value: alt || `[Image: ${src}]`,
  };
};
