// @rewire
type SiteIdHandler = () => string | null;

let siteIdHandler: SiteIdHandler;

/** returns the id of the current site.
 * `null` indicates "site not found".
 * Needs loading context.
 */
export function currentSiteId(): string | null {
  return siteIdHandler();
}

export function setCurrentSiteIdHandler(handler: SiteIdHandler): void {
  siteIdHandler = handler;
}
