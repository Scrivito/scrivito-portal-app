export function applyJrPlatformEtrackerEndpoint(script: HTMLScriptElement) {
  if (!isJrOwnedDomain()) return

  script.src = 'https://analytics.justrelate.com/code/e.js'
  script.setAttribute(
    'data-tracking-domain',
    'https://analytics.justrelate.com',
  )
}

function isJrOwnedDomain() {
  const { hostname } = window.location
  return hostname === 'justrelate.com' || hostname.endsWith('.justrelate.com')
}
