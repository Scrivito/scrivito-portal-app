import { connect, currentLanguage } from 'scrivito'

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
  switch (currentLanguage()) {
    case 'de':
      return 'Daten werden geladen…'
    default:
      return 'Loading data…'
  }
}
