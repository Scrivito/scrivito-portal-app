import { connect, currentLanguage, CurrentPage } from 'scrivito'
import { HelmetProvider, HelmetServerState } from '@dr.pogodin/react-helmet'

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
    <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:z-10 focus-within:w-full focus-within:bg-white/85 focus-within:shadow-[0_0_60px_rgba(255,255,255,0.95)] focus-within:transition-all focus-within:duration-300 focus-within:ease-in-out">
      <div className="container mx-auto my-6 px-3">
        <a href="#main" className="btn btn-primary">
          {localizeSkipToContent()}
        </a>
      </div>
    </div>
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
      return 'Skip to content'
  }
}
