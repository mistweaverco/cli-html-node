export interface HTMLNode {
  nodeName: string;
  tagName?: string;
  value?: string;
  attrs?: Array<{
    name: string;
    value: string;
  }>;
  childNodes?: HTMLNode[];
  parentNode?: HTMLNode;
}

export type StyleFunction = (text: string) => string;

export interface Theme {
  [key: string]: string | number | boolean | StyleFunction;
}

export interface RenderResult {
  value: string;
  width?: number;
  color?: string;
  pre?: string | null;
  post?: string | null;
  type?: string;
  nodeName?: string;
}

export interface GlobalConfig {
  theme: Theme;
  width?: number;
  indent?: string;
  skipFirst?: boolean;
  pre?: boolean;
  lineWidth?: number;
}

export interface TagRenderer {
  (node: HTMLNode, config: GlobalConfig): RenderResult;
}

export interface TagMap {
  [key: string]: TagRenderer;
} 