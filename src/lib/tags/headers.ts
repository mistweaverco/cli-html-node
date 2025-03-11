import { HTMLNode, GlobalConfig, RenderResult } from "../../types";
import { blockTag } from "../tag-helpers/block-tag";

const createHeader =
  (level: number) =>
  (node: HTMLNode, config: GlobalConfig): RenderResult => {
    const result = blockTag(node, config);
    const prefix = "#".repeat(level);

    return {
      value: `${prefix} ${result.value}`,
      width: (result.width || 0) + level + 1,
    };
  };

export const h1 = createHeader(1);
export const h2 = createHeader(2);
export const h3 = createHeader(3);
export const h4 = createHeader(4);
export const h5 = createHeader(5);
export const h6 = createHeader(6);
