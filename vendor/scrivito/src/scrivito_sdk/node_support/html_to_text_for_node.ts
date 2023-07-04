import { htmlToText } from 'html-to-text';

export function htmlToTextForNode(html: string): string {
  return htmlToText(html, htmlToTextOptions);
}

const htmlToTextOptions = {
  tags: {
    '': { format: 'block' },
    a: { format: 'inline' },
    h1: { format: 'block' },
    h2: { format: 'block' },
    h3: { format: 'block' },
    h4: { format: 'block' },
    h5: { format: 'block' },
    h6: { format: 'block' },
    img: { format: 'skip' },
    table: { format: 'block' },
    ul: { format: 'block' },
  },
  wordwrap: false,
};
