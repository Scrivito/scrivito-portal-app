import { useState } from 'react'
import { uiContext } from 'scrivito'
import './SchemaOrgActions.css'

const ANALYZE_PROMPT = `Check whether the JSON-LD of this page contains only information that can also be found on the rest of the page.

The page content has priority over the JSON-LD. Only the main content of the page counts. Ignore teasers and promotional boxes that point to other pages or entities (e.g. a teaser for an upcoming event on a page that is not about that event), as well as navigation, header and footer. If the JSON-LD contradicts the page, or contains information that the page does not mention, the JSON-LD is not correct. For example: if the page says that something takes place in 2025, but the JSON-LD says 2024, the JSON-LD is wrong.

Also check whether the JSON-LD uses the schema.org type that best matches the page. If a type that Google supports for rich results (e.g. Article, Event, Product, FAQPage, BreadcrumbList, Organization) matches the page, it should be preferred, and the JSON-LD should include the properties Google requires for it, plus the recommended ones the page provides information for. If no such type matches, any other fitting schema.org type is fine.

Report every discrepancy and every missing Google-required or recommended property you find, and suggest a corrected JSON-LD.`

const CREATE_PROMPT = `Create schema.org structured data (JSON-LD) for this page.

Pick the schema.org type that best describes the page. If a type that Google supports for rich results (e.g. Article, Event, Product, FAQPage, BreadcrumbList, Organization) matches the page, prefer it and fill in all properties Google requires for it, plus the recommended properties as far as the page provides information for them. If no such type matches, use any other fitting schema.org type. Only use information that is actually present in the main content of the page. Ignore teasers and promotional boxes that point to other pages or entities (e.g. a teaser for an upcoming event on a page that is not about that event), as well as navigation, header and footer. Do not invent or guess any values. Leave out properties for which the page provides no information.

Return a single, valid JSON object that includes "@context": "https://schema.org". It must not contain the text "</script". Avoid the "mentions" and "relatedLink" attributes. Pretty print the JSON with an indentation of 2 spaces. Write the resulting JSON to the "jsonLd" attribute of this page.`

const UPDATE_PROMPT = `Update the existing JSON-LD of this page so that it matches the current content of the page.

The page content has priority over the JSON-LD. Only the main content of the page counts. Ignore teasers and promotional boxes that point to other pages or entities (e.g. a teaser for an upcoming event on a page that is not about that event), as well as navigation, header and footer. Correct every value that contradicts the page (e.g. if the page says that something takes place in 2025, but the JSON-LD says 2024, change it to 2025). Remove information that the main content of the page does not mention, including information that stems from teasers. Add relevant schema.org properties for information that is on the page but missing in the JSON-LD. Make sure the JSON-LD uses the schema.org type that best matches the page. If a type that Google supports for rich results matches the page, prefer it, include all properties Google requires for it, and add the recommended properties as far as the page provides information for them. If no such type matches, any other fitting schema.org type is fine. Keep everything else that is still correct unchanged.

Return a single, valid JSON object that includes "@context": "https://schema.org". It must not contain the text "</script". Avoid the "mentions" and "relatedLink" attributes. Pretty print the JSON with an indentation of 2 spaces. Write the updated JSON to the "jsonLd" attribute of this page.`

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
