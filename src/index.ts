import { parse } from 'parse5';
import { HTMLNode } from './types';
import { indentify } from './lib/utils';
import { getGlobalConfig } from './lib/utils/get-global-config';
import { renderTag } from './lib/utils/render-tag';

const htmlToCli = (rawHTML: string, customTheme: Record<string, string> = {}) => {
  const document = parse(rawHTML) as HTMLNode;
  const globalConfig = getGlobalConfig(document, customTheme);

  return `\n${indentify(' ', false)(
    (renderTag(document, globalConfig) || { value: '' }).value,
  )}\n\n`;
};

export default htmlToCli;
