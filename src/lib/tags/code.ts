import { HTMLNode, GlobalConfig, RenderResult, StyleFunction } from '../../types';
import { inlineTag } from '../tag-helpers/inline-tag';
import { blockTag } from '../tag-helpers/block-tag';
import { getAttribute } from '../utils';
import chalk from 'chalk';
import { highlight } from 'cli-highlight';
import wrapAnsi from 'wrap-ansi';

const getLanguageFromClass = (node: HTMLNode): string | null => {
  const classAttr = getAttribute(node, 'class', '');
  const classAttributes = classAttr.split(' ');

  for (const classAttribute of classAttributes) {
    if (classAttribute.startsWith('language-')) {
      return classAttribute.slice(9);
    }
    if (classAttribute.startsWith('lang-')) {
      return classAttribute.slice(5);
    }
  }

  return null;
};

export const code = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = inlineTag()(node, config);
  const content = result.value;
  const langName = getLanguageFromClass(node);

  let codeValue: string;
  if (langName) {
    codeValue = highlight(content, {
      language: langName,
      theme: {
        comment: chalk.blackBright,
      },
    });
  } else {
    const codeTheme = config.theme?.code as StyleFunction | undefined;
    codeValue = codeTheme?.(content) || content;
  }

  // If inside pre tag, render as block code
  if (node.parentNode?.nodeName === 'pre') {
    const codeValueLines = codeValue.split('\n');
    const codeLinesLength = `${codeValueLines.length}`.length;
    const pad = `${Array.from({ length: codeLinesLength + 2 }).join(' ')}`;

    const codeContent = codeValueLines.map(
      (codeLine, index) => {
        const codeNumbersTheme = config.theme?.codeNumbers as StyleFunction | undefined;
        const lineNumber = codeNumbersTheme?.(
          `${index + 1}`.padStart(codeLinesLength, ' ')
        ) || `${index + 1}`.padStart(codeLinesLength, ' ');
        const wrappedLine = wrapAnsi(`|${codeLine}|`, (config.width || 80) - pad.length - 2, {
          trim: true,
        }).slice(1, -1);
        return `${lineNumber} ${wrappedLine}`;
      }
    );

    return {
      value: codeContent.join('\n'),
      width: config.width,
      type: 'block',
      nodeName: 'code'
    };
  }

  // Otherwise render as inline code
  const inlineCodeTheme = config.theme?.inlineCode as StyleFunction | undefined;
  const inlineCodeValue = inlineCodeTheme?.(codeValue) || `\`${codeValue}\``;
  return {
    value: inlineCodeValue,
    width: (result.width || 0) + 2,
    type: 'inline',
    pre: result.pre || null,
    post: result.post || null,
    nodeName: 'code'
  };
};

export const pre = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = blockTag(node, { ...config, width: (config.width || 80) - 10 });
  return {
    value: result.value,
    width: result.width,
    type: 'block',
    nodeName: 'pre'
  };
}; 