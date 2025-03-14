import { HTMLNode, Theme, GlobalConfig } from "../../types";
import { getAttribute } from "../utils";
import { getTheme } from "./get-theme";

export const getGlobalConfig = (
  document: HTMLNode,
  theme: Theme,
): GlobalConfig => {
  const htmlTag = document.childNodes?.find((node) => node.nodeName === "html");
  theme = { ...getTheme(), ...theme };
  if (!htmlTag) {
    return { theme };
  }

  const width = parseInt(getAttribute(htmlTag, "width", "80"), 10);
  const indent = getAttribute(htmlTag, "indent", "  ");
  const skipFirst = getAttribute(htmlTag, "skip-first", "false") === "true";

  return {
    theme,
    width: isNaN(width) ? 80 : width,
    indent,
    skipFirst,
  };
};
