import { HTMLNode, GlobalConfig, RenderResult, TagRenderer } from '../../types';
import { blockTag } from '../tag-helpers/block-tag';
import { inlineTag } from '../tag-helpers/inline-tag';

// Helper function to create a basic block tag renderer
const createBlockTag = () => (node: HTMLNode, config: GlobalConfig): RenderResult => {
  return blockTag(node, config);
};

// Export block elements
export const article: TagRenderer = createBlockTag();
export const aside: TagRenderer = createBlockTag();
export const blink: TagRenderer = createBlockTag();
export const dialog: TagRenderer = createBlockTag();
export const div: TagRenderer = createBlockTag();
export const figcaption: TagRenderer = createBlockTag();
export const footer: TagRenderer = createBlockTag();
export const form: TagRenderer = createBlockTag();
export const header: TagRenderer = createBlockTag();
export const hgroup: TagRenderer = createBlockTag();
export const main: TagRenderer = createBlockTag();
export const nav: TagRenderer = createBlockTag();
export const p: TagRenderer = createBlockTag();
export const picture: TagRenderer = createBlockTag();
export const section: TagRenderer = createBlockTag();

// Export inline elements
export const label: TagRenderer = inlineTag(); 