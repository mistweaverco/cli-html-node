import { HTMLNode, GlobalConfig, RenderResult } from '../../types';

export const br = (_node: HTMLNode, _config: GlobalConfig): RenderResult => ({
  value: '\n',
}); 