import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { renderTag } from './render-tag';

interface ListItem {
  value: string;
  width: number;
  level: number;
}

export const renderList = (
  items: HTMLNode[],
  config: GlobalConfig,
  level: number = 0,
  marker: string = '•'
): ListItem[] => {
  return items
    .filter(item => item.nodeName === 'li')
    .map(item => {
      const result = renderTag(item, config);
      if (!result) return null;

      const nestedLists = item.childNodes?.filter(
        child => child.nodeName === 'ul' || child.nodeName === 'ol'
      ) || [];

      const nestedItems = nestedLists.flatMap(list =>
        renderList(
          list.childNodes || [],
          config,
          level + 1,
          list.nodeName === 'ol' ? '1.' : '•'
        )
      );

      const indent = '  '.repeat(level);
      const prefix = marker === '1.' ? `${level + 1}.` : marker;
      const mainItem: ListItem = {
        value: `${indent}${prefix} ${result.value}`,
        width: indent.length + prefix.length + 1 + (result.width || 0),
        level,
      };

      return [mainItem, ...nestedItems];
    })
    .filter((item): item is ListItem[] => item !== null)
    .flat();
}; 