import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { getAttribute } from '../utils';

export const input = (node: HTMLNode, _config: GlobalConfig): RenderResult => {
  const type = getAttribute(node, 'type', 'text');
  const value = getAttribute(node, 'value', '');
  const placeholder = getAttribute(node, 'placeholder', '');
  
  let displayValue = value || placeholder;
  if (!displayValue) {
    displayValue = `[${type} input]`;
  }
  
  return {
    value: displayValue,
  };
};

export const button = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const value = getAttribute(node, 'value', '');
  const type = getAttribute(node, 'type', 'button');
  
  return {
    value: value || `[${type} button]`,
  };
};

export const output = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const value = getAttribute(node, 'value', '');
  
  return {
    value: value || '[output]',
  };
}; 