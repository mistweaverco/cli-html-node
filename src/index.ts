import { parse } from 'parse5';
import { Theme, HTMLNode } from './types';
import { indentify } from './lib/utils';
import { getGlobalConfig } from './lib/utils/get-global-config';
import { renderTag } from './lib/utils/render-tag';
import { getTheme } from './lib/utils/get-theme';

const htmlToCli = (rawHTML: string, customTheme?: Theme): string => {
  const document = parse(rawHTML) as HTMLNode;
  const theme = customTheme || getTheme(document);

  // console.dir(
  //   filterAst(document).childNodes[0].childNodes[1].childNodes,
  //   { depth: null },
  // );

  const globalConfig = getGlobalConfig(document, theme);
  const result = renderTag(document, globalConfig);

  return `\n${indentify(' ', false)(
    result?.value || ''
  )}\n\n`;
};

export default htmlToCli;
