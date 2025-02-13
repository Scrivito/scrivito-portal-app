import { CurrentPage } from 'scrivito'
import { HelmetProvider, HelmetServerState } from 'react-helmet-async'

import { CurrentPageMetadata } from './Components/CurrentPageMetadata'
import { ErrorBoundary } from './Components/ErrorBoundary'
import { NotFoundErrorPage } from './Components/NotFoundErrorPage'
import { Toasts } from './Components/Toasts'
import { DesignAdjustments } from './Components/DesignAdjustments'

import { PortalBot } from './portal_bot'

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
          <a href="#main" className="btn skip-to-content">
            Skip to Content
          </a>
          <DesignAdjustments>
            <CurrentPage />
            <NotFoundErrorPage />
          </DesignAdjustments>
          <CurrentPageMetadata />
          <Toasts />
        </div>
        <PortalBot />
      </ErrorBoundary>
    </HelmetProvider>
  )
}
