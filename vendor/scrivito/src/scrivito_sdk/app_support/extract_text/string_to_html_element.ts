let parser: DOMParser;

export function stringToHtmlElement(htmlString: string): HTMLElement {
  parser ||= new DOMParser();
  return parser.parseFromString(htmlString, 'text/html').documentElement;
}
