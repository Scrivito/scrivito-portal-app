import { useEffect } from 'react'
import { connect, currentPage } from 'scrivito'
import { breadcrumbAncestors } from '../utils/breadcrumbAncestors'
import { currentStructuredDataJson } from '../structuredData'

const SCRIPT_ID = 'current-page-structured-data'

export const StructuredData = connect(() => {
  const json = currentJson()

  useEffect(() => {
    const existing = document.getElementById(SCRIPT_ID)

    if (!json) {
      // Drop a stale prerendered script that no current page owns
      existing?.remove()
      return
    }

    const script = existing ?? document.createElement('script')
    script.id = SCRIPT_ID
    script.setAttribute('type', 'application/ld+json')
    script.textContent = json
    document.head.appendChild(script)

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

function currentJson(): string | null {
  const page = currentPage()

  return page
    ? currentStructuredDataJson({
        breadcrumbAncestors: breadcrumbAncestors(page),
      })
    : null
}
