export function isLocalhostUrl(url: string): boolean {
  try {
    return new URL(url).hostname === 'localhost';
  } catch {
    return false;
  }
}
