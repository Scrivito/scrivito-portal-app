import { useEffect } from 'react'
import { connect, currentPage, Obj } from 'scrivito'
import { buildJsonLd } from '../utils/buildJsonLd'

const SCRIPT_ID = 'current-page-structured-data'

export const StructuredData = connect(() => {
  const json = currentJson()

  useEffect(() => {
    if (!json) return

    const script = document.getElementById(SCRIPT_ID) ?? createScript()
    script.textContent = json

    return () => script.remove()
  }, [json])

  return null
})

export const StructuredDataHeadScript = connect(() => {
  const json = currentJson()
  if (!json) return null

  return (
    <script
      id={SCRIPT_ID}
      type="application/ld+json"
      // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
})

function createScript(): HTMLElement {
  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.type = 'application/ld+json'
  document.head.appendChild(script)

  return script
}

function currentJson(): string {
  const page = currentPage()
  if (!page) return ''

  // Escaping "<" keeps the JSON from terminating the script element (or the
  // <head>, which the prerendering looks for) and is still valid JSON.
  return stringifyJsonLd(page).replaceAll('<', '\\u003c')
}

function stringifyJsonLd(page: Obj): string {
  try {
    return JSON.stringify(buildJsonLd(page), null, 2)
  } catch {
    return ''
  }
}
