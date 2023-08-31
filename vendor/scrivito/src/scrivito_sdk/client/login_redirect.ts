let wantsLoginRedirect = true;

export function disableLoginRedirect(): void {
  wantsLoginRedirect = false;
}

export function isLoginRedirectEnabled(): boolean {
  return wantsLoginRedirect;
}

// For test purposes only
export function resetLoginRedirect(): void {
  wantsLoginRedirect = true;
}
