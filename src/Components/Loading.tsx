import { setupVisitorI18n } from '../i18n'
import { PropsWithChildren } from 'react'
import { connect } from 'scrivito'
import messages from './i18n.visitor.json'

const t = setupVisitorI18n(messages)

export const Loading = (
  props: object | PropsWithChildren<{ className?: string }> = {},
) => <LoadingPlaceholder {...props} />

const LoadingPlaceholder = connect(function LoadingPlaceholder({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const classNames = ['loading-placeholder']
  if (className) classNames.push(className)

  const message = t('loadingData')

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
