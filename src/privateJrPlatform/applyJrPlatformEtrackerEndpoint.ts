export function applyJrPlatformEtrackerEndpoint(script: HTMLScriptElement) {
  script.src = 'https://analytics.justrelate.com/code/e.js'
  script.setAttribute(
    'data-tracking-domain',
    'https://analytics.justrelate.com',
  )
}
