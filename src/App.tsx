import { currentLanguage, CurrentPage } from 'scrivito'
import { HelmetProvider, HelmetServerState } from 'react-helmet-async'

import { CurrentPageMetadata } from './Components/CurrentPageMetadata'
import { ErrorBoundary } from './Components/ErrorBoundary'
import { NotFoundErrorPage } from './Components/NotFoundErrorPage'
import { Toasts } from './Components/Toasts'
import { DesignAdjustments } from './Components/DesignAdjustments'
import { SinglePageSite } from './Components/SinglePageSite'

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
          <div className="visually-hidden-focusable overflow-hidden">
            <div className="container-xl">
              <a href="#main" className="d-inline-flex p-2 m-1">
                {localizeSkipToContent()}
              </a>
            </div>
          </div>
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

function localizeSkipToContent(): string {
  switch (currentLanguage()) {
    case 'de':
      return 'Zum Inhalt springen'
    case 'fr':
      return 'Aller au contenu'
    case 'pl':
      return 'Przejdź do treści'
    default:
      return 'Skip to Content'
  }
}
