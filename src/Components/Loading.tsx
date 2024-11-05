import { PropsWithChildren } from 'react'
import { connect, currentLanguage } from 'scrivito'

export const Loading = (
  props: object | PropsWithChildren<{ className?: string }> = {},
) => <LoadingPlaceholder {...props} />

const LoadingPlaceholder = connect(function LoadingPlaceholder({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const classNames = ['loading-placeholder']
  if (className) classNames.push(className)

  const message = getMessage()

  return (
    <div
      aria-busy="true"
      aria-valuetext={message}
      className={classNames.join(' ')}
      role="progressbar"
      title={message}
    >
      {children}
    </div>
  )
})

function getMessage(): string {
  switch (currentLanguage()) {
    case 'de':
      return 'Daten werden geladen…'
    case 'fr':
      return 'Chargement des données…'
    case 'pl':
      return 'Ładowanie danych…'
    default:
      return 'Loading data…'
  }
}
