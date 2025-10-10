import { htmlToText } from 'html-to-text';

export function htmlToTextForNode(html: string): string {
  return htmlToText(html, htmlToTextOptions);
}

/** @see nodeToText for tags we consider inline */
const htmlToTextOptions = {
  tags: {
    '': { format: 'block' },
    a: { format: 'inline' },
    abbr: { format: 'inline' },
    b: { format: 'inline' },
    bdi: { format: 'inline' },
    bdo: { format: 'inline' },
    cite: { format: 'inline' },
    code: { format: 'inline' },
    data: { format: 'inline' },
    dfn: { format: 'inline' },
    em: { format: 'inline' },
    h1: { format: 'block' },
    h2: { format: 'block' },
    h3: { format: 'block' },
    h4: { format: 'block' },
    h5: { format: 'block' },
    h6: { format: 'block' },
    i: { format: 'inline' },
    img: { format: 'skip' },
    kbd: { format: 'inline' },
    mark: { format: 'inline' },
    q: { format: 'inline' },
    rp: { format: 'inline' },
    rt: { format: 'inline' },
    ruby: { format: 'inline' },
    s: { format: 'inline' },
    samp: { format: 'inline' },
    small: { format: 'inline' },
    span: { format: 'inline' },
    strong: { format: 'inline' },
    sub: { format: 'inline' },
    sup: { format: 'inline' },
    table: { format: 'block' },
    time: { format: 'inline' },
    u: { format: 'inline' },
    ul: { format: 'block' },
    var: { format: 'inline' },
    wbr: { format: 'inline' },
  },
  wordwrap: false,
};
