import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { blockTag } from '../tag-helpers/block-tag';

export const dl = (node: HTMLNode, config: GlobalConfig): RenderResult => blockTag(node, config);

export const dt = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = blockTag(node, config);
  return {
    value: `${result.value}:`,
    width: (result.width || 0) + 1,
  };
};

export const dd = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = blockTag(node, config);
  return {
    value: `  ${result.value}`,
    width: (result.width || 0) + 2,
  };
}; 