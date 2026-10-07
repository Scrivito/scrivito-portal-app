import { useState } from 'react'
import { uiContext } from 'scrivito'
import './SchemaOrgActions.css'

const ANALYZE_PROMPT = `Check whether the JSON-LD of this page contains only information that can also be found on the rest of the page.

The page content has priority over the JSON-LD. If the JSON-LD contradicts the page, or contains information that the page does not mention, the JSON-LD is not correct. For example: if the page says that something takes place in 2025, but the JSON-LD says 2024, the JSON-LD is wrong.

Also check whether the JSON-LD is optimized for Google rich results: it should use a type that Google supports for rich results (e.g. Article, Event, Product, FAQPage, BreadcrumbList, Organization), include all properties that Google requires for that type, and include the recommended properties that the page provides information for.

Report every discrepancy and every missing required or recommended property you find, and suggest a corrected JSON-LD.`

const CREATE_PROMPT = `Create schema.org structured data (JSON-LD) for this page.

Optimize the JSON-LD for Google rich results. Pick the schema.org type that best describes the page and is supported by Google for rich results (e.g. Article, Event, Product, FAQPage, BreadcrumbList, Organization). Fill in all properties that Google requires for that type, and the recommended properties as far as the page provides information for them. Only use information that is actually present on the page. Do not invent or guess any values. Leave out properties for which the page provides no information.

Return a single, valid JSON object that includes "@context": "https://schema.org". It must not contain the text "</script". Avoid the "mentions" and "relatedLink" attributes. Pretty print the JSON with an indentation of 2 spaces. Return only the JSON, so it can be pasted directly into the JSON-LD field of the page.`

const UPDATE_PROMPT = `Update the existing JSON-LD of this page so that it matches the current content of the page.

The page content has priority over the JSON-LD. Correct every value that contradicts the page (e.g. if the page says that something takes place in 2025, but the JSON-LD says 2024, change it to 2025). Remove information that the page does not mention. Add relevant schema.org properties for information that is on the page but missing in the JSON-LD. Make sure the JSON-LD is optimized for Google rich results: use a type that Google supports for rich results, include all properties that Google requires for that type, and add the recommended properties as far as the page provides information for them. Keep everything else that is still correct unchanged.

Return a single, valid JSON object that includes "@context": "https://schema.org". It must not contain the text "</script". Avoid the "mentions" and "relatedLink" attributes. Pretty print the JSON with an indentation of 2 spaces. Return only the updated JSON, so it can be pasted directly into the JSON-LD field of the page.`

export function SchemaOrgActions() {
  const { theme } = uiContext() || { theme: null }
  const [prompt, setPrompt] = useState('')
  if (!theme) return null

  return (
    <div className={`schema-org-actions-wrapper schema-org-actions-${theme}`}>
      <ul className="schema-org-actions">
        <li>
          <button
            className="schema-org-action-item"
            onClick={() => setPrompt(ANALYZE_PROMPT)}
          >
            <i className="bi bi-search" />
            <span className="schema-org-action-label">Analyze</span>
          </button>
        </li>
        <li>
          <button
            className="schema-org-action-item"
            onClick={() => setPrompt(CREATE_PROMPT)}
          >
            <i className="bi bi-stars" />
            <span className="schema-org-action-label">Create</span>
          </button>
        </li>
        <li>
          <button
            className="schema-org-action-item"
            onClick={() => setPrompt(UPDATE_PROMPT)}
          >
            <i className="bi bi-arrow-repeat" />
            <span className="schema-org-action-label">Update</span>
          </button>
        </li>
      </ul>

      {prompt && (
        <div className="schema-org-message">
          <p>Copy the following prompt over to CoWorker:</p>
          <pre className="schema-org-prompt">{prompt}</pre>
        </div>
      )}
    </div>
  )
}
