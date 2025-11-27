import { childNodeListToArray } from './child_node_list_to_array';

const IGNORE_NODE = ['HEAD', 'SCRIPT'];

export function nodeToText(node: Node): string {
  const nodeName = node.nodeName;
  if (IGNORE_NODE.indexOf(nodeName) > -1) return '';
  if (nodeName === '#text') return node.textContent || '';

  return childNodeListToArray(node.childNodes)
    .map((child) =>
      INLINE_NODES.includes(child.nodeName)
        ? nodeToText(child)
        : ` ${nodeToText(child)} `
    )
    .join('');
}

/** @see htmlToTextForNode for tags we consider inline */
const INLINE_NODES = [
  '#text',
  'A',
  'ABBR',
  'B',
  'BDI',
  'BDO',
  'CITE',
  'CODE',
  'DATA',
  'DFN',
  'EM',
  'I',
  'KBD',
  'MARK',
  'Q',
  'RP',
  'RT',
  'RUBY',
  'S',
  'SAMP',
  'SMALL',
  'SPAN',
  'STRONG',
  'SUB',
  'SUP',
  'TIME',
  'U',
  'VAR',
  'WBR',
];
