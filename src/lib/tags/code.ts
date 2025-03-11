import {
  HTMLNode,
  GlobalConfig,
  RenderResult,
  StyleFunction,
} from "../../types";
import { inlineTag } from "../tag-helpers/inline-tag";
import { blockTag } from "../tag-helpers/block-tag";
import wrapAnsi from "wrap-ansi";

export const code = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = inlineTag()(node, config);
  const content = result.value;

  const codeTheme = config.theme?.code as StyleFunction | undefined;
  const codeValue = codeTheme?.(content) || content;

  // If inside pre tag, render as block code
  if (node.parentNode?.nodeName === "pre") {
    const codeValueLines = codeValue.split("\n");
    const codeLinesLength = `${codeValueLines.length}`.length;
    const pad = `${Array.from({ length: codeLinesLength + 2 }).join(" ")}`;

    const codeContent = codeValueLines.map((codeLine, index) => {
      const codeNumbersTheme = config.theme?.codeNumbers as
        | StyleFunction
        | undefined;
      const lineNumber =
        codeNumbersTheme?.(`${index + 1}`.padStart(codeLinesLength, " ")) ||
        `${index + 1}`.padStart(codeLinesLength, " ");
      const wrappedLine = wrapAnsi(
        `|${codeLine}|`,
        (config.width || 80) - pad.length - 2,
        {
          trim: true,
        },
      ).slice(1, -1);
      return `${lineNumber} ${wrappedLine}`;
    });

    return {
      value: codeContent.join("\n"),
      width: config.width,
      type: "block",
      nodeName: "code",
    };
  }

  // Otherwise render as inline code
  const inlineCodeTheme = config.theme?.inlineCode as StyleFunction | undefined;
  const inlineCodeValue = inlineCodeTheme?.(codeValue) || `\`${codeValue}\``;
  return {
    value: inlineCodeValue,
    width: (result.width || 0) + 2,
    type: "inline",
    pre: result.pre || null,
    post: result.post || null,
    nodeName: "code",
  };
};

export const pre = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = blockTag(node, {
    ...config,
    width: (config.width || 80) - 10,
  });
  return {
    value: result.value,
    width: result.width,
    type: "block",
    nodeName: "pre",
  };
};
