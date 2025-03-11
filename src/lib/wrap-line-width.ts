import wrapAnsi from "wrap-ansi";

interface WrapContext {
  lineWidth: number;
  pre?: boolean;
}

const wrapLineWidth = (text: string, context: WrapContext): string =>
  wrapAnsi(text, context.lineWidth, { trim: !context.pre });

export default wrapLineWidth;
