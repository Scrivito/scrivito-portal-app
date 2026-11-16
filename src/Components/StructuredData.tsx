import { useEffect } from 'react'
import { connect, currentPage } from 'scrivito'
import { buildBreadcrumbStructuredData } from '../utils/buildBreadcrumbStructuredData'
import { currentStructuredData } from '../structuredData'

const SCRIPT_ID = 'current-page-structured-data'
const BREADCRUMB_SCRIPT_ID = 'current-page-breadcrumb-structured-data'

export const StructuredData = connect(() => {
  useStructuredDataScript(SCRIPT_ID, currentJson())
  useStructuredDataScript(BREADCRUMB_SCRIPT_ID, currentBreadcrumbJson())

  return null
})

export const StructuredDataHeadScript = connect(() => (
  <>
    <HeadScript id={SCRIPT_ID} json={currentJson()} />
    <HeadScript id={BREADCRUMB_SCRIPT_ID} json={currentBreadcrumbJson()} />
  </>
))

function useStructuredDataScript(id: string, json: string) {
  useEffect(() => {
    if (!json) {
      // Drop a stale prerendered script that no current page owns
      document.getElementById(id)?.remove()
      return
    }

    const script = document.getElementById(id) ?? createScript(id)
    script.textContent = json

    return () => script.remove()
  }, [id, json])
}

function HeadScript({ id, json }: { id: string; json: string }) {
  if (!json) return null

  return (
    <script
      id={id}
      type="application/ld+json"
      // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}

function createScript(id: string): HTMLElement {
  const script = document.createElement('script')
  script.id = id
  script.type = 'application/ld+json'
  document.head.appendChild(script)

  return script
}

function currentJson(): string {
  return stringifyStructuredData(currentStructuredData)
}

function currentBreadcrumbJson(): string {
  return stringifyStructuredData(() => {
    const page = currentPage()

    return page && buildBreadcrumbStructuredData(page)
  })
}

function stringifyStructuredData(build: () => unknown): string {
  try {
    const data = build()
    if (!data) return ''

    // Escaping "<" keeps the JSON from terminating the script element (or the
    // <head>, which the prerendering looks for) and is still valid JSON.
    return JSON.stringify(data, null, 2).replaceAll('<', '\\u003c')
  } catch {
    return ''
  }
}
