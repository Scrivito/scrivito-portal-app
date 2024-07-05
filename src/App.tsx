import {
  CurrentPage,
  NotFoundErrorPage as ScrivitoNotFoundErrorPage,
} from 'scrivito'
import { HelmetProvider } from 'react-helmet-async'

import { CurrentPageMetadata } from './Components/CurrentPageMetadata'
import { ErrorBoundary } from './Components/ErrorBoundary'
import { NotFoundErrorPage } from './Components/NotFoundErrorPage'
import { Toasts } from './Components/Toasts'
import { DesignAdjustments } from './Components/DesignAdjustments'

const helmetContext = {}

export function App() {
  return (
    <HelmetProvider context={helmetContext}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </HelmetProvider>
  )
}
