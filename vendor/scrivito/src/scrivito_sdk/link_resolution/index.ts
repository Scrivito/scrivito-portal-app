export {
  OBJ_ID_PATTERN,
  formatInternalLinks,
} from 'scrivito_sdk/link_resolution/format_internal_links';
export type { InternalUrl } from 'scrivito_sdk/link_resolution/format_internal_links';
export { setUrlResolutionHandler } from 'scrivito_sdk/link_resolution/resolve_url';
export type { ResolvedUrl } from 'scrivito_sdk/link_resolution/resolve_url';
export {
  finishLinkResolutionFor,
  startLinkResolutionFor,
  setupWriteMonitorNotification,
} from 'scrivito_sdk/link_resolution/link_resolution';
