import cspBuilder from 'content-security-policy-builder'

export const DEV_CSP_NONCE = 'dev-csp-nonce'

function headers({
  scriptSrc,
  frameAncestors,
}: {
  scriptSrc: string[]
  frameAncestors: string[]
}) {
  return {
    'Content-Security-Policy': cspBuilder({
      directives: {
        'base-uri': "'none'",
        'default-src': ["'self'", 'data:', 'https:', 'wss:'],
        'img-src': ["'self'", 'data:', 'https:', 'blob:'],
        'style-src': ["'self'", 'data:', 'https:', 'wss:', "'unsafe-inline'"],
        'script-src': scriptSrc,
        'object-src': "'none'",
        'block-all-mixed-content': true,
        'frame-ancestors': frameAncestors,
      },
    }),
    'X-Frame-Options': 'sameorigin',
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  }
}

// Netlify or Cloudflare Pages headers format. For details:
// * https://www.netlify.com/docs/headers-and-basic-auth/
// * https://developers.cloudflare.com/pages/platform/headers/
export function productionHeadersFile(scriptHashes: string[]): string {
  return `/*
${Object.entries(productionHeaders(scriptHashes))
  .map(([key, value]) => `  ${key}: ${value}`)
  .join('\n')}
`
}

export function parseProductionHeadersFile(
  content: string,
): Record<string, string> {
  return Object.fromEntries(
    content
      .split('\n')
      .filter((line) => line.startsWith('  '))
      .map((line) => {
        const colonIndex = line.indexOf(': ')
        return [line.slice(2, colonIndex), line.slice(colonIndex + 2)]
      }),
  )
}

export function developmentHeaders(): Record<string, string> {
  return headers({
    scriptSrc: ["'strict-dynamic'", `'nonce-${DEV_CSP_NONCE}'`],
    frameAncestors: ['*'],
  })
}

function productionHeaders(scriptHashes: string[]): Record<string, string> {
  return headers({
    scriptSrc: ["'strict-dynamic'", ...scriptHashes],
    frameAncestors: [
      "'self'",
      'https://*.scrivito.com',
      'https://*.etracker.com',

      // TODO: Remove later on:
      'http://localhost:8090',
      'https://*.scrivito-ui.pages.dev',
    ],
  })
}
