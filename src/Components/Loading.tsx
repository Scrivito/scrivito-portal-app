import { connect } from 'scrivito'
import { getCurrentLanguage } from '../utils/currentLanguage'

export const Loading = connect(function Loading() {
  return (
    <div className="text-muted">
      <span
        className="spinner-border spinner-border-sm me-2"
        role="status"
        aria-hidden="true"
      />
      {getMessage()}
    </div>
  )
})

function getMessage(): string {
  switch (getCurrentLanguage()) {
    case 'de':
      return 'Daten werden geladen…'
    default:
      return 'Loading data…'
  }
}
