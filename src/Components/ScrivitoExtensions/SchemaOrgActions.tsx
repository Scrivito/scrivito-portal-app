import { useState } from 'react'
import { uiContext } from 'scrivito'
import './SchemaOrgActions.css'

const ACTIONS = [
  { key: 'analyze', label: 'Analyze', icon: 'bi-search' },
  { key: 'create', label: 'Create', icon: 'bi-stars' },
  { key: 'update', label: 'Update', icon: 'bi-arrow-repeat' },
]

const ANALYZE_PROMPT = `Check whether the JSON-LD of this page contains only information that can also be found on the rest of the page.

The page content has priority over the JSON-LD. If the JSON-LD contradicts the page, or contains information that the page does not mention, the JSON-LD is not correct. For example: if the page says that something takes place in 2025, but the JSON-LD says 2024, the JSON-LD is wrong.

Report every discrepancy you find, and suggest a corrected JSON-LD.`

export function SchemaOrgActions() {
  const { theme } = uiContext() || { theme: null }
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  if (!theme) return null

  async function copyPrompt() {
    await navigator.clipboard.writeText(ANALYZE_PROMPT)
    setCopied(true)
  }

  return (
    <div className={`schema-org-actions-wrapper schema-org-actions-${theme}`}>
      <ul className="schema-org-actions">
        {ACTIONS.map(({ key, label, icon }) => (
          <li key={key}>
            <button
              type="button"
              className="schema-org-action-item"
              onClick={() => {
                setActiveAction(key)
                setCopied(false)
              }}
            >
              <i className={`bi ${icon}`} />
              <span className="schema-org-action-label">{label}</span>
            </button>
          </li>
        ))}
      </ul>

      {activeAction === 'analyze' && (
        <div className="schema-org-message">
          <p>Copy the following prompt over to CoWorker:</p>
          <pre className="schema-org-prompt">{ANALYZE_PROMPT}</pre>
          <button
            type="button"
            className="schema-org-action-item"
            onClick={copyPrompt}
          >
            <i className={`bi ${copied ? 'bi-check-lg' : 'bi-clipboard'}`} />
            <span className="schema-org-action-label">
              {copied ? 'Copied' : 'Copy prompt'}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
