import { PropsWithChildren } from 'react'
import { connect, currentLanguage } from 'scrivito'
import messages from './i18n.visitor.json'
import rosetta from 'rosetta'

const i18n = rosetta(messages)
const lang = currentLanguage() ?? 'en'
i18n.locale(lang in messages ? lang : 'en')

export const Loading = (
  props: object | PropsWithChildren<{ className?: string }> = {},
) => <LoadingPlaceholder {...props} />

const LoadingPlaceholder = connect(function LoadingPlaceholder({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const classNames = ['loading-placeholder']
  if (className) classNames.push(className)

  const message = i18n.t('loadingData')

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
