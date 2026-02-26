import { setupVisitorI18n } from './i18n'
import { connect, CurrentPage } from 'scrivito'
import { HelmetProvider, HelmetServerState } from '@dr.pogodin/react-helmet'
import messages from './i18n.visitor.json'

import { CurrentPageMetadata } from './Components/CurrentPageMetadata'
import { ErrorBoundary } from './Components/ErrorBoundary'
import { NotFoundErrorPage } from './Components/NotFoundErrorPage'
import { Toasts } from './Components/Toasts'
import { DesignAdjustments } from './Components/DesignAdjustments'
import { SinglePageSite } from './Components/SinglePageSite'

const t = setupVisitorI18n(messages)

export const helmetContext: { helmet?: HelmetServerState } = {}

export function App({
  appWrapperRef,
}: {
  appWrapperRef?: React.RefCallback<HTMLElement>
}) {
  return (
    <HelmetProvider context={helmetContext}>
      <ErrorBoundary>
        <div ref={appWrapperRef} id="app-wrapper">
          <SkipToContent />
          <DesignAdjustments>
            <SinglePageSite>
              <CurrentPage />
              <NotFoundErrorPage />
              <CurrentPageMetadata />
            </SinglePageSite>
          </DesignAdjustments>
          <Toasts />
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

const SkipToContent = connect(function SkipToContent() {
  return (
    <div className="skippy visually-hidden-focusable overflow-hidden">
      <div className="container my-4">
        <a href="#main" className="btn btn-primary">
          {t('skipToContent')}
        </a>
      </div>
    </div>
  )
})
