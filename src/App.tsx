import {
  CurrentPage,
  NotFoundErrorPage as ScrivitoNotFoundErrorPage,
} from 'scrivito'
import { HelmetProvider, HelmetServerState } from 'react-helmet-async'

import { CurrentPageMetadata } from './Components/CurrentPageMetadata'
import { ErrorBoundary } from './Components/ErrorBoundary'
import { NotFoundErrorPage } from './Components/NotFoundErrorPage'
import { Toasts } from './Components/Toasts'
import { DesignAdjustments } from './Components/DesignAdjustments'

const helmetContext: { helmet?: HelmetServerState } = {}

export function App({
  appWrapperRef,
}: {
  appWrapperRef?: React.RefCallback<HTMLElement>
}) {
  return (
    <HelmetProvider context={helmetContext}>
      <ErrorBoundary>
        <div ref={appWrapperRef}>
          <a href="#main" className="btn skip-to-content">
            Skip to Content
          </a>
          <CurrentPage />
          <ScrivitoNotFoundErrorPage>
            <NotFoundErrorPage />
          </ScrivitoNotFoundErrorPage>
          <CurrentPageMetadata />
          <Toasts />
          <DesignAdjustments />
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  )
}
