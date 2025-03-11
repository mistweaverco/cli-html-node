import { HTMLNode, GlobalConfig, RenderResult, TagRenderer } from "../../types";
import { inlineTag } from "../tag-helpers/inline-tag";

const withTheme = (key: string): TagRenderer => {
  return (node: HTMLNode, config: GlobalConfig): RenderResult => {
    const themeFunction = config.theme?.[key];
    if (typeof themeFunction !== "function") {
      return inlineTag()(node, config);
    }
    return inlineTag((value: string) => themeFunction(value))(node, config);
  };
};

// Text style tags
export const del = withTheme("del");
export const ins = withTheme("ins");
export const italic = withTheme("italic");
export const strikethrough = withTheme("strikethrough");
export const underline = withTheme("underline");
export const bold = withTheme("bold");
export const dim = withTheme("dim");
export const inverse = withTheme("inverse");
export const hidden = withTheme("hidden");
export const overline = withTheme("overline");
export const samp = withTheme("samp");
export const kbd = withTheme("kbd");
export const i = withTheme("i");
export const em = withTheme("em");
export const time = withTheme("time");
export const u = underline;
export const strong = bold;
export const b = bold;
export const s = strikethrough;
export const strike = strikethrough;
export const variableTag = withTheme("var");
export const mark = withTheme("mark");

// Tags that don't apply any styles
export const noStyle = inlineTag();
export const small = noStyle;
export const big = noStyle;
export const sub = noStyle;
export const sup = noStyle;
export const tt = noStyle;
export const abbr = noStyle;
export const acronym = noStyle;
export const cite = noStyle;
export const dfn = noStyle;
export const var_ = noStyle;
export const bdo = noStyle;
export const wbr = noStyle;
export const font = noStyle;
export const data = noStyle;

// Special case for quotes
export const q = inlineTag((value: string) => `"${value}"`);
