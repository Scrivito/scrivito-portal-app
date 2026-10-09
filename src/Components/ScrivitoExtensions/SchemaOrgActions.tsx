import { useState } from 'react'
import { uiContext } from 'scrivito'
import './SchemaOrgActions.css'

const JSON_LD_RULES = `The JSON-LD of this page consists of two attributes: "jsonLd" contains the JSON, and "jsonLdImage" references the image objects that are used as its top-level "image".

Rules for the JSON-LD:
- MOST IMPORTANT RULE: The JSON-LD must never contradict the page. The page content always has priority over the JSON-LD. Every single value in the JSON-LD (e.g. dates, times, prices, names, locations) must match what the page says. For example: if the page says that something takes place in 2025, the JSON-LD must not say 2024.
- Only the main content of the page counts. Teasers and promotional boxes that point to other pages or entities (e.g. a teaser for an upcoming event on a page that is not about that event), as well as navigation, header and footer, are ignored. In particular, properties like "mentions", "relatedLink" or "significantLink" must not be used to list other pages or entities the page links to.
- The JSON-LD must only contain information that is actually present in the main content of the page. Values must never be invented or guessed, not even for properties Google requires; properties for which the page provides no information are left out.
- The JSON-LD uses the schema.org type that best matches the page. If a type that Google supports for rich results (e.g. Article, Event, Product) matches the page, it is preferred, and the JSON-LD includes the properties Google requires or recommends for it, as far as the page provides information for them. If the main content of the page consists of questions and answers, FAQPage is a fitting type, even though Google no longer shows rich results for it. If no such type matches, any other fitting schema.org type is fine.
- The JSON-LD must not describe the website's own organization or the page's breadcrumb trail (no top-level "Organization" or "BreadcrumbList"), as they are provided separately. Nested organizations as property values (e.g. "author", "publisher", "organizer", "seller") are allowed.
- The following top-level properties are added automatically when the page is rendered, so the "jsonLd" attribute must not contain them: "url", "image", "dateCreated", "dateModified", "datePublished", "inLanguage" and "workTranslation". This only applies to the top level; nested entities may contain these properties.
- "jsonLdImage" contains only images that are visible in the main content of the page and that depict its main entity. If the page has no such image, "jsonLdImage" is left empty.
- The JSON-LD is a single, syntactically valid JSON object (not an array) with "@context": "https://schema.org" at its top level. It uses only types and properties defined by schema.org. It describes one main entity; further entities are nested as property values. It is pretty printed with an indentation of 2 spaces.`

const ANALYZE_PROMPT = `Check whether the JSON-LD of this page follows the rules below.

${JSON_LD_RULES}

Report every rule violation you find. Above all, report every value that contradicts the page. Also report every Google-required or recommended property that is missing although the page provides information for it.

This is a read-only analysis. Do not change the page, and do not write anything to "jsonLd", "jsonLdImage" or any other attribute. Only report your findings in your answer, and describe the changes that would be needed in words.`

const CREATE_PROMPT = `Create schema.org structured data (JSON-LD) for this page that follows the rules below.

${JSON_LD_RULES}

Write the result to the "jsonLd" and "jsonLdImage" attributes of this page.`

const UPDATE_PROMPT = `Update the existing JSON-LD of this page so that it matches the current content of the page and follows the rules below. Correct every value that contradicts the page, remove everything that violates the rules (including information that stems from teasers), and add properties for information that is on the page but missing in the JSON-LD. Keep everything else that is still correct unchanged.

${JSON_LD_RULES}

Write the result to the "jsonLd" and "jsonLdImage" attributes of this page.`

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
