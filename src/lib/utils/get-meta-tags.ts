import { HTMLNode } from "../../types";
import { getAttribute } from "../utils";

export const getMetaTags = (document: HTMLNode): Record<string, string> => {
  const head = document.childNodes?.find((node) => node.nodeName === "head");
  if (!head) return {};

  const metaTags =
    head.childNodes?.filter((node) => node.nodeName === "meta") || [];

  return metaTags.reduce<Record<string, string>>((acc, meta) => {
    const name = getAttribute(meta, "name", "");
    const content = getAttribute(meta, "content", "");

    if (name && content) {
      acc[name] = content;
    }

    return acc;
  }, {});
};
