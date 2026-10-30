import { ensureObject } from './ensureObject'
import { ensureString } from './ensureString'

// The package has no handler for WebSite, so only the source can be checked.
export function validateWebSiteStructuredData(
  source: unknown,
): { message: string; severity: 'error' | 'warning' } | undefined {
  const json = ensureString(source)
  if (!json.trim()) return

  let raw: Record<string, unknown>
  try {
    raw = ensureObject(JSON.parse(json))
  } catch {
    return {
      message: 'WebSite structured data must be valid JSON.',
      severity: 'error',
    }
  }

  if (json.toLowerCase().includes('</script')) {
    return {
      message: 'WebSite structured data must not contain "</script".',
      severity: 'error',
    }
  }

  if (raw['@context'] !== 'https://schema.org') {
    return {
      message:
        'WebSite structured data must contain "@context" with the value "https://schema.org".',
      severity: 'error',
    }
  }
  if (raw['@type'] !== 'WebSite') {
    return {
      message: 'WebSite structured data must have the "@type" "WebSite".',
      severity: 'error',
    }
  }
  if (typeof raw.name !== 'string' || !raw.name.trim()) {
    return {
      message:
        'WebSite structured data should contain a "name", which search engines use as the site name.',
      severity: 'warning',
    }
  }
  if ('url' in raw) {
    return {
      message: 'The "url" property is ignored. The homepage URL is used.',
      severity: 'warning',
    }
  }
}
