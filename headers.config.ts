import cspBuilder from 'content-security-policy-builder'

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
export function productionHeadersFile(): string {
  return `/*
${Object.entries(productionHeaders())
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
    scriptSrc: [
      "'self'",
      'https://*.etracker.com',
      'https://*.etracker.de',
      'https://api.scrivito.com',
      'https://assets.scrivito.com',
      // The package `@vitejs/plugin-react-swc` include an inline script into index.html (see [1]).
      // [1] https://github.com/vitejs/vite-plugin-react/blob/7517103485081b26004e79f169efdd2d12a60946/packages/common/refresh-utils.ts#L7-L12
      // In case it breaks please look into the JS console and search for "CSP".
      // There you can find the current "sha256-x" value, which is to be copied over here.
      "'sha256-Z2/iFzh9VMlVkEOar1f/oSHWwQk3ve1qk/C2WdsC4Xk='",
    ],
    frameAncestors: ['*'],
  })
}

function productionHeaders(): Record<string, string> {
  return headers({
    scriptSrc: [
      "'self'",
      'https://*.etracker.com',
      'https://*.etracker.de',
      'https://api.scrivito.com',
      'https://assets.scrivito.com',
    ],
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
