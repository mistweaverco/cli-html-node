import ansiEscapes from 'ansi-escapes';
import { HTMLNode, GlobalConfig, RenderResult, StyleFunction } from '../../types';
import { inlineTag } from '../tag-helpers/inline-tag';
import { getAttribute } from '../utils';

export const a = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = inlineTag()(node, config);
  const rawHref = getAttribute(node, 'href', '');

  const schemes = [
    'file://',
    'http://',
    'https://',
    'mailto:',
    'ftp://',
    'ftps://',
    'sftp://',
    'ssh://',
    'dav://',
    'tel:',
    'git://',
  ];

  const href = rawHref && schemes.some((url) => rawHref.startsWith(url)) ? rawHref : null;
  const themeFunc = config.theme?.a as StyleFunction | undefined;
  const linkText = themeFunc ? themeFunc(result.value) : result.value;
  const linkValue = href ? ansiEscapes.link(linkText, href) : `[${linkText}](${rawHref})`;

  return {
    value: linkValue,
    width: result.width,
    type: 'inline',
    pre: result.pre || null,
    post: result.post || null,
    nodeName: 'a'
  };
};
