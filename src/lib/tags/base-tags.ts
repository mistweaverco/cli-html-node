import { HTMLNode, GlobalConfig, RenderResult, TagRenderer } from '../../types';
import { blockTag } from '../tag-helpers/block-tag';
import { inlineTag } from '../tag-helpers/inline-tag';

// Helper function to create a basic block tag renderer
const createBlockTag = () => (node: HTMLNode, config: GlobalConfig): RenderResult => {
  return blockTag(node, config);
};

// Export common block-level elements
export const article = createBlockTag();
export const aside = createBlockTag();
export const blink = createBlockTag();
export const dialog = createBlockTag();
export const div = createBlockTag();
export const figcaption = createBlockTag();
export const footer = createBlockTag();
export const form = createBlockTag();
export const header = createBlockTag();
export const hgroup = createBlockTag();
export const main = createBlockTag();
export const nav = createBlockTag();
export const picture = createBlockTag();
export const section = createBlockTag();

// Export inline elements
export const label: TagRenderer = inlineTag();
export const p: TagRenderer = inlineTag(); 