import { HTMLNode, GlobalConfig, RenderResult } from '../../types';

const createVoidTag = () => (_node: HTMLNode, _config: GlobalConfig): RenderResult => ({
  value: '',
});

// Export void elements
export const area = createVoidTag();
export const base = createVoidTag();
export const basefont = createVoidTag();
export const bgsound = createVoidTag();
export const embed = createVoidTag();
export const frame = createVoidTag();
export const keygen = createVoidTag();
export const link = createVoidTag();
export const meta = createVoidTag();
export const param = createVoidTag();
export const source = createVoidTag();
export const track = createVoidTag();
export const map = createVoidTag();
export const select = createVoidTag();
export const summary = createVoidTag();

// Elements that typically don't render content in CLI
export const script = createVoidTag();
export const style = createVoidTag();
export const head = createVoidTag();
export const title = createVoidTag();
export const noscript = createVoidTag();
export const template = createVoidTag();

// Form elements that might need special handling in the future
export const option = createVoidTag();
export const optgroup = createVoidTag();

// Media elements that might need special handling in the future
export const audio = createVoidTag();
export const video = createVoidTag();
export const applet = createVoidTag(); 