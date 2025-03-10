import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { blockTag } from '../tag-helpers/block-tag';

export const center = (node: HTMLNode, config: GlobalConfig): RenderResult => blockTag(node, config); 