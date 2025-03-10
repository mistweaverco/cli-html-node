import { HTMLNode, Theme, StyleFunction } from '../../types';
import { getAttribute } from '../utils';
import chalkString from 'chalk-string';

type ChalkStyle = Parameters<ReturnType<typeof chalkString>>[0];

const newStyle = chalkString();
const style = (styleString: ChalkStyle = 'reset', value: string = ''): string => newStyle(styleString, value);

const defaultTheme: Record<string, ChalkStyle> = {
  h1: 'red bold',
  h2: 'blue bold',
  h3: 'blue bold',
  h4: 'cyan bold',
  h5: 'cyan',
  h6: 'cyan',
  a: 'blue underline',
  figcaption: 'bgGreen bold',
  blockquote: 'black',
  code: 'yellowBright',
  inlineCode: 'bgBlack',
  codeNumbers: 'blackBright dim',
  dt: 'blue bold',
  dd: 'cyan',
  dl: 'reset',
  del: 'bgRed black',
  ins: 'bgGreen black',
  strike: 'strikethrough',
  underline: 'underline',
  bold: 'bold',
  samp: 'yellowBright',
  kbd: 'bgBlack',
  var: 'blue italic',
  mark: 'bgYellow black',
  time: 'cyan',
  italic: 'italic',
  i: 'italic',
  em: 'italic',
  cite: 'italic'
};

export const getTheme = (document?: HTMLNode): Theme => {
  let customTheme: Record<string, ChalkStyle> = {};

  if (document) {
    const head = document.childNodes?.find(node => node.nodeName === 'head');
    const styleNode = head?.childNodes?.find(node => node.nodeName === 'style');
    const themeContent = styleNode ? getAttribute(styleNode, 'theme', '{}') : '{}';

    try {
      customTheme = JSON.parse(themeContent);
    } catch {
      customTheme = {};
    }
  }

  const processedTheme: Theme = {};

  // Process all default theme styles
  Object.entries(defaultTheme).forEach(([key, defaultStyle]) => {
    processedTheme[key] = ((value: string) => style(customTheme[key] || defaultStyle, value)) as StyleFunction;
  });

  // Add any additional custom theme styles not in defaults
  Object.entries(customTheme).forEach(([key, styleString]) => {
    if (!(key in processedTheme)) {
      processedTheme[key] = ((value: string) => style(styleString || 'reset', value)) as StyleFunction;
    }
  });

  return processedTheme;
}; 
