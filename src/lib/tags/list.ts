import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { getAttribute } from '../utils';
import { renderTag } from '../utils/render-tag';

const renderListItemContent = (node: HTMLNode, config: GlobalConfig): string => {
  if (!node.childNodes) return '';
  
  return node.childNodes
    .map(child => renderTag(child, config))
    .filter((result): result is RenderResult => result !== null)
    .map(result => result.value)
    .join('');
};

const renderListItems = (items: HTMLNode[], config: GlobalConfig, marker: string, level: number = 0): string => {
  return items
    .filter(item => item.nodeName === 'li')
    .map((item, index) => {
      const content = renderListItemContent(item, config);
      if (!content) return '';
      
      const prefix = marker === '1' ? `${index + 1}.` : marker;
      const indent = '  '.repeat(level);
      const prefixPadding = ' '.repeat(prefix.length + 1);
      
      // Handle multiline content by adding proper indentation to each line
      const lines = content.split('\n').filter(Boolean);
      return lines.map((line, i) => {
        if (i === 0) {
          return `${indent}${prefix} ${line.trim()}`;
        }
        return `${indent}${prefixPadding}${line.trim()}`;
      }).join('\n');
    })
    .filter(Boolean)
    .join('\n');
};

export const ul = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const marker = getAttribute(node, 'type', '•');
  const level = getNestingLevel(node);
  
  return {
    value: renderListItems(node.childNodes || [], config, marker, level),
    width: config.width,
  };
};

export const ol = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const type = getAttribute(node, 'type', '1');
  const start = parseInt(getAttribute(node, 'start', '1'), 10);
  const level = getNestingLevel(node);
  
  return {
    value: renderListItems(node.childNodes || [], config, type, level),
    width: config.width,
  };
};

export const li = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  return {
    value: renderListItemContent(node, config),
    width: config.width,
  };
};

const getNestingLevel = (node: HTMLNode): number => {
  let level = 0;
  let current = node;
  
  while (current.parentNode) {
    if (current.parentNode.nodeName === 'ul' || current.parentNode.nodeName === 'ol') {
      level++;
    }
    current = current.parentNode;
  }
  
  return level;
}; 