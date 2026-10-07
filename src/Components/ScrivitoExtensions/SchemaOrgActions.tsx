import { uiContext } from 'scrivito'
import './SchemaOrgActions.css'

const ACTIONS = [
  { key: 'analyze', label: 'Analyze', icon: 'bi-search' },
  { key: 'create', label: 'Create', icon: 'bi-stars' },
  { key: 'update', label: 'Update', icon: 'bi-arrow-repeat' },
]

export function SchemaOrgActions() {
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  return (
    <ul className={`schema-org-actions schema-org-actions-${theme}`}>
      {ACTIONS.map(({ key, label, icon }) => (
        <li key={key} className="schema-org-action-item">
          <i className={`bi ${icon}`} />
          <span className="schema-org-action-label">{label}</span>
        </li>
      ))}
    </ul>
  )
}
