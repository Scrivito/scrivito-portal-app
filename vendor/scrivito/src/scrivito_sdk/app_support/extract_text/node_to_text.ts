import { childNodeListToArray } from './child_node_list_to_array';

const IGNORE_NODE = ['HEAD', 'SCRIPT'];

export function nodeToText(node: Node): string {
  const nodeName = node.nodeName;
  if (IGNORE_NODE.indexOf(nodeName) > -1) return '';
  if (nodeName === '#text') return node.textContent || '';

  return childNodeListToArray(node.childNodes)
    .map((child) => nodeToText(child))
    .join(' ');
}
