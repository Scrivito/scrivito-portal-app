// @rewire
export function devicePixelRatio(windowObject: Window = window): number {
  return windowObject.devicePixelRatio || 1;
}

export function currentHref() {
  return windowLocation().href;
}

export function windowLocationOrigin() {
  return windowLocation().origin;
}

export function currentHash() {
  return windowLocation().hash;
}

export function windowName() {
  return window.name;
}

export function navigator(): Navigator {
  return window.navigator;
}

export function openWindow(url?: string, target?: string): Window | null {
  return window.open(url, target);
}

export function reload(): void {
  windowLocation().reload();
}

export function renameTo(newName: string): void {
  window.name = newName;
}

export function assignLocation(newLocation: string): void {
  windowLocation().assign(newLocation);
}

export function replaceLocation(newLocation: string): void {
  windowLocation().replace(newLocation);
}

export function replaceHistoryState(
  state: object,
  title: string,
  url?: string
): void {
  window.history.replaceState(state, title, url);
}

export function screen(): Screen {
  return window.screen;
}

export function getDocument(): Document {
  return document;
}

export function innerHeight(): number {
  return window.innerHeight;
}

export function pageXOffset(): number {
  return window.pageXOffset;
}

export function pageYOffset(): number {
  return window.pageYOffset;
}

export function scrollTo(x: number, y: number): void {
  window.scrollTo(x, y);
}

export function getScrollHeight(): number {
  return getDocument().body.scrollHeight;
}

/** For stubWindowProxyLocation only. Use this if you need to stub a location.
 * See currentHref and currentOrigin to access location data.
 * Use assignLocation, replaceLocation, and reload for location changes.
 */
export function windowLocation(): Location {
  return window.location;
}
