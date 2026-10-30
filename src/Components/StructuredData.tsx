import { useEffect } from 'react'
import { connect, currentPage, Obj } from 'scrivito'
import { buildJsonLd } from '../utils/buildJsonLd'
import { buildOrganizationJsonLd } from '../utils/buildOrganizationJsonLd'
import { buildWebSiteJsonLd } from '../utils/buildWebSiteJsonLd'

const SCRIPT_ID = 'current-page-structured-data'
const ORGANIZATION_SCRIPT_ID = 'organization-structured-data'
const WEBSITE_SCRIPT_ID = 'website-structured-data'

export const StructuredData = connect(() => {
  useJsonLdScript(SCRIPT_ID, currentJson())

  return null
})

export const StructuredDataHeadScript = connect(() => (
  <HeadScript id={SCRIPT_ID} json={currentJson()} />
))

export const OrganizationStructuredData = connect(() => {
  useJsonLdScript(ORGANIZATION_SCRIPT_ID, organizationJson())

  return null
})

export const OrganizationStructuredDataHeadScript = connect(() => (
  <HeadScript id={ORGANIZATION_SCRIPT_ID} json={organizationJson()} />
))

export const WebSiteStructuredData = connect(() => {
  useJsonLdScript(WEBSITE_SCRIPT_ID, webSiteJson())

  return null
})

export const WebSiteStructuredDataHeadScript = connect(() => (
  <HeadScript id={WEBSITE_SCRIPT_ID} json={webSiteJson()} />
))

function useJsonLdScript(id: string, json: string) {
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
  const page = currentPage()
  if (!page) return ''

  return stringifyJsonLd(() => buildJsonLd(page))
}

function organizationJson(): string {
  const homepage = Obj.root()
  if (!homepage) return ''

  return stringifyJsonLd(() => buildOrganizationJsonLd(homepage))
}

function webSiteJson(): string {
  const homepage = Obj.root()
  if (!homepage) return ''

  return stringifyJsonLd(() => buildWebSiteJsonLd(homepage))
}

function stringifyJsonLd(build: () => unknown): string {
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
