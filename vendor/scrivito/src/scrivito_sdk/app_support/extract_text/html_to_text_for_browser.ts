import { nodeToText } from './node_to_text';
import { stringToHtmlElement } from './string_to_html_element';

export function htmlToTextForBrowser(html: string) {
  const element = stringToHtmlElement(html);
  return nodeToText(element);
}
