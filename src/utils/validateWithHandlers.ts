import BaseValidator, {
  type PathElement,
  type StructuredDataIssue,
} from '@adobe/structured-data-validator/src/types/base.js'

export type Severity = 'error' | 'warning' | 'info'

export type HandlerClass = typeof BaseValidator

const SEVERITY_RANK: Record<Severity, number> = {
  info: 0,
  warning: 1,
  error: 2,
}

/** Runs the handlers registered for the `@type`s of all nodes of `jsonLd`. */
export function collectIssues(
  jsonLd: Record<string, unknown>,
  handlers: Record<string, HandlerClass[]>,
): StructuredDataIssue[] {
  return rootItems(jsonLd).flatMap((item, index) =>
    validateNode(item, [{ type: typeNames(item)[0], index }], handlers),
  )
}

/** Combines issues (and further, already formatted ones) into one result. */
export function summarizeIssues(
  issues: StructuredDataIssue[],
  extra: { message: string; severity: Severity }[] = [],
): { message: string; severity: Severity } | undefined {
  const messages = [
    ...issues.map((issue) => `${pathLabel(issue.path)}: ${issue.issueMessage}`),
    ...extra.map(({ message }) => message),
  ]
  if (messages.length === 0) return

  return {
    message: messages.join('; '),
    severity: [
      ...issues.map(issueSeverity),
      ...extra.map(({ severity }) => severity),
    ].reduce(moreSevere, 'info'),
  }
}

export function typeNames(data: Record<string, unknown>): string[] {
  const types = Array.isArray(data['@type']) ? data['@type'] : [data['@type']]

  return types
    .filter((type): type is string => typeof type === 'string')
    .map((type) => type.replace(/^(https?:\/\/schema\.org\/|schema:)/, ''))
}

function moreSevere(a: Severity, b: Severity): Severity {
  return SEVERITY_RANK[b] > SEVERITY_RANK[a] ? b : a
}

// The package only knows ERROR and WARNING. Missing optional fields are
// reported as WARNING with an "(optional)" suffix, but are merely informational.
function issueSeverity(issue: StructuredDataIssue): Severity {
  if (issue.severity === 'ERROR') return 'error'

  return issue.issueMessage.endsWith('(optional)') ? 'info' : 'warning'
}

function rootItems(jsonLd: unknown): Record<string, unknown>[] {
  if (Array.isArray(jsonLd)) return jsonLd.flatMap(rootItems)
  if (!isRecord(jsonLd)) return []
  if (Array.isArray(jsonLd['@graph'])) return rootItems(jsonLd['@graph'])

  return [jsonLd]
}

function validateNode(
  data: unknown,
  path: PathElement[],
  handlers: Record<string, HandlerClass[]>,
): StructuredDataIssue[] {
  if (Array.isArray(data)) {
    return data.flatMap((item, index) => {
      const last: PathElement = {
        ...path[path.length - 1],
        index,
        length: data.length,
      }
      if (isRecord(item) && item['@type']) last.type = typeNames(item)
      return validateNode(item, [...path.slice(0, -1), last], handlers)
    })
  }

  if (!isRecord(data) || !data['@type']) return []

  const ownIssues = typeNames(data).flatMap((type) =>
    (handlers[type] ?? []).flatMap((Handler) =>
      new Handler({ dataFormat: 'jsonld', path, type }).validate(data),
    ),
  )

  const nestedIssues = Object.entries(data)
    .filter(([key, value]) => !key.startsWith('@') && isNestedObject(value))
    .flatMap(([property, value]) => {
      const element: PathElement = { property }
      const nested = Array.isArray(value) ? undefined : value
      if (isRecord(nested) && nested['@type']) element.type = typeNames(nested)
      return validateNode(value, [...path, element], handlers)
    })

  return [...ownIssues, ...nestedIssues]
}

function pathLabel(path: PathElement[]): string {
  return path
    .map((element) => element.property ?? [element.type].flat().join('/'))
    .join('.')
}

function isNestedObject(value: unknown): boolean {
  return Array.isArray(value) ? isRecord(value[0]) : isRecord(value)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
