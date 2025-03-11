import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { getAttribute } from '../utils';
import { renderTag } from '../utils/render-tag';
import { blockTag } from '../tag-helpers/block-tag';

const renderListItemContent = (node: HTMLNode, config: GlobalConfig): string => {
  if (!node.childNodes) return '';
  
  // Separate nested lists from other content
  const nestedLists = node.childNodes.filter(child => 
    child.nodeName === 'ul' || child.nodeName === 'ol'
  );
  const otherContent = node.childNodes.filter(child => 
    child.nodeName !== 'ul' && child.nodeName !== 'ol'
  );

  // Render main content
  const mainContent = blockTag({ ...node, childNodes: otherContent }, config).value;

  // Render nested lists
  const nestedContent = nestedLists
    .map(list => renderTag(list, config))
    .filter((result): result is RenderResult => result !== null)
    .map(result => result.value)
    .join('\n');

  return mainContent + (nestedContent ? '\n' + nestedContent : '');
};

const renderListItems = (items: HTMLNode[], config: GlobalConfig, marker: string, level: number = 0): string => {
  return items
    .filter(item => item.nodeName === 'li')
    .map((item) => {
      const content = renderListItemContent(item, config);
      if (!content) return '';
      
      const indent = '  '.repeat(Math.max(0, level));
      const prefix = marker;
      
      // Handle multiline content by adding proper indentation to each line
      const lines = content.split('\n');
      return lines.map((line, i) => {
        if (i === 0) {
          return `${indent}${prefix} ${line}`;
        }
        // For nested lists, don't add extra indentation as they handle their own
        if (line.startsWith('  ')) {
          return `${indent}${line}`;
        }
        // For continuation lines of the main content
        return `${indent}  ${line}`;
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
  
  return Math.max(0, level - 1);
}; 