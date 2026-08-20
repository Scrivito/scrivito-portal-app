import { InternalError, pruneString } from 'scrivito_sdk/common';

let htmlToText: undefined | ((html: string) => string);

export function setHtmlToTextConverter(converter: (html: string) => string) {
  htmlToText = converter;
}

export function removeHtmlTags(html: string): string {
  if (!htmlToText) throw new InternalError();

  if (html === '') return '';
  const text = htmlToText(html);
  return pruneString(text);
}
