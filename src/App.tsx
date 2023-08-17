import {
  CurrentPage,
  NotFoundErrorPage as ScrivitoNotFoundErrorPage,
} from 'scrivito'
import { HelmetProvider } from 'react-helmet-async'

import { CurrentPageMetadata } from './Components/CurrentPageMetadata'
import { ErrorBoundary } from './Components/ErrorBoundary'
import { NotFoundErrorPage } from './Components/NotFoundErrorPage'

export const helmetContext = {}

export function App() {
  return (
    <HelmetProvider context={helmetContext}>
      <ErrorBoundary>
        <CurrentPage />
        <ScrivitoNotFoundErrorPage>
          <NotFoundErrorPage />
        </ScrivitoNotFoundErrorPage>
        <CurrentPageMetadata />
      </ErrorBoundary>
    </HelmetProvider>
  )
}
