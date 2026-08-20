import { currentHref } from 'scrivito_sdk/common';

export function absoluteUrl(url: string): string {
  return new URL(url, currentHref()).href;
}
