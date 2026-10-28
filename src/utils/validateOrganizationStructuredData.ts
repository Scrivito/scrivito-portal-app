import { Obj } from 'scrivito'
import { buildOrganizationJsonLd } from './buildOrganizationJsonLd'
import { ensureObject } from './ensureObject'
import { ensureString } from './ensureString'
import DefinedRegion from '@adobe/structured-data-validator/src/types/DefinedRegion.js'
import ImageObject from '@adobe/structured-data-validator/src/types/ImageObject.js'
import MerchantReturnPolicy from '@adobe/structured-data-validator/src/types/MerchantReturnPolicy.js'
import Organization from '@adobe/structured-data-validator/src/types/Organization.js'
import {
  collectIssues,
  summarizeIssues,
  type HandlerClass,
} from './validateWithHandlers'

export function validateOrganizationStructuredData(
  source: unknown,
  homepage: Obj,
): { message: string; severity: 'error' | 'warning' | 'info' } | undefined {
  const json = ensureString(source)
  if (!json.trim()) return

  let raw: Record<string, unknown>
  try {
    raw = ensureObject(JSON.parse(json))
  } catch {
    return {
      message: 'Organization structured data must be valid JSON.',
      severity: 'error',
    }
  }

  if (json.toLowerCase().includes('</script')) {
    return {
      message: 'Organization structured data must not contain "</script".',
      severity: 'error',
    }
  }

  if (raw['@context'] !== 'https://schema.org') {
    return {
      message:
        'Organization structured data must contain "@context" with the value "https://schema.org".',
      severity: 'error',
    }
  }
  if (typeof raw['@type'] !== 'string' || !raw['@type'].trim()) {
    return {
      message:
        'Organization structured data must contain "@type" with a non-empty string value.',
      severity: 'error',
    }
  }

  const compiled = buildOrganizationJsonLd(homepage)
  const result = compiled && summarizeIssues(collectIssues(compiled, HANDLERS))
  if (!('logo' in raw)) return result

  const logoMessage =
    'The "logo" property is ignored. Use "Organization logo" instead.'
  if (!result) return { message: logoMessage, severity: 'warning' }

  return {
    message: `${logoMessage} ${result.message}`,
    severity: result.severity === 'error' ? 'error' : 'warning',
  }
}

// Mirrors the registry of the package's async `Validator`, which cannot be used
// because it lazy-loads its handlers via `import()`.
const HANDLERS: Record<string, HandlerClass[]> = {
  DefinedRegion: [DefinedRegion],
  ImageObject: [ImageObject],
  MerchantReturnPolicy: [MerchantReturnPolicy],
  Organization: [Organization],
}
