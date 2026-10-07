import { useState } from 'react'
import { uiContext } from 'scrivito'
import './SchemaOrgActions.css'

const ANALYZE_PROMPT = `Check whether the JSON-LD of this page contains only information that can also be found on the rest of the page.

The page content has priority over the JSON-LD. If the JSON-LD contradicts the page, or contains information that the page does not mention, the JSON-LD is not correct. For example: if the page says that something takes place in 2025, but the JSON-LD says 2024, the JSON-LD is wrong.

Report every discrepancy you find, and suggest a corrected JSON-LD.`

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
          <button className="schema-org-action-item">
            <i className="bi bi-stars" />
            <span className="schema-org-action-label">Create</span>
          </button>
        </li>
        <li>
          <button className="schema-org-action-item">
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
