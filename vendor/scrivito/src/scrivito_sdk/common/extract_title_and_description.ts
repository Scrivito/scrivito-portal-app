export function extractTitleAndDescription(
  text: string
): [string, string | undefined] {
  const match = /^([\s\S]+?[.!?])\s+([\s\S]+)/.exec(text);
  return match ? [match[1], match[2] || undefined] : [text, undefined];
}
