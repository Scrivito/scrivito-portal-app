import { connect } from 'scrivito'
import { getCurrentLanguage } from '../utils/currentLanguage'

export const Loading = connect(function Loading() {
  const message = getMessage()
  return (
    <div
      aria-busy="true"
      aria-valuetext={message}
      className="loading-placeholder"
      role="progressbar"
      title={message}
    />
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
