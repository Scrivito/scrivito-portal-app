// @rewire
export function loadCss(
  url: string,
  targetDocument: Document = window.document,
): void {
  const link = targetDocument.createElement('link');

  link.rel = 'stylesheet';
  link.href = url;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  appendChild(targetDocument.head!, link);
}

export function loadJs(
  url: string,
  targetDocument: Document = window.document,
): void {
  const script = targetDocument.createElement('script');

  script.src = url;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  appendChild(targetDocument.head!, script);
}

// For test purpose only
export function appendChild(head: HTMLHeadElement, element: HTMLElement): void {
  head.appendChild(element);
}
