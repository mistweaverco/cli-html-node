import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { blockTag } from '../tag-helpers/block-tag';

export const address = (node: HTMLNode, config: GlobalConfig): RenderResult => blockTag(node, config); 