import { LinkJson } from 'scrivito_sdk/client';
import { resolveUrl } from 'scrivito_sdk/link_resolution/resolve_url';
import { resolveHtmlUrl } from './content_conversion/resolve_html_url';

export function convertHtml(input: string): string {
  return convertUrls(convertUrls(input, 'a', 'href'), 'img', 'src');
}

export function convertLinklist(primitiveLinks: LinkJson[]): LinkJson[] {
  return primitiveLinks.map(convertLink);
}

export function convertLink(primitiveLink: LinkJson): LinkJson {
  if (!primitiveLink.url) return primitiveLink;

  const internalUrl = resolveUrl(primitiveLink.url);
  if (internalUrl === null) return primitiveLink;

  return {
    ...primitiveLink,
    url: null,
    obj_id: internalUrl.obj_id,
    fragment: internalUrl.fragment || null,
    query: internalUrl.query || null,
  };
}

function convertUrls(html: string, tagName: string, attribute: string): string {
  // regex was inspired by: https://regex101.com/r/rMAHrE/1
  const regex = new RegExp(
    `<${tagName}\\s+(?:[^>]*?\\s+)?${attribute}=(["'])(.*?)\\1`,
    'gi'
  );

  const convertedHtml = html.replace(
    regex,
    (fullMatch, _subMatch, urlMatch) => {
      if (!urlMatch) {
        return fullMatch;
      }
      const firstChar = urlMatch.charAt(0);
      // a link pointing to the same page needs not to be link-resolved
      if (firstChar === '#' || firstChar === '?') {
        return fullMatch;
      }
      // substr is faster than match(/^objid:/)
      // See a63eac6dde8325f2731f447fd4087f2547f2fc46 for benchmark
      if (urlMatch.substr(0, 6) === 'objid:') {
        return fullMatch;
      }

      const newUrl = resolveHtmlUrl(urlMatch);
      if (!newUrl) return fullMatch;

      return fullMatch.replace(urlMatch, newUrl);
    }
  );

  return convertedHtml;
}
