import { connect, currentLanguage, CurrentPage } from 'scrivito'
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
    <a href="#main" className="btn skip-to-content">
      {localizeSkipToContent()}
    </a>
  )
})

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
