import { connect, currentLanguage, CurrentPage } from 'scrivito'

import { CurrentPageMetadata } from './Components/CurrentPageMetadata'
import { ErrorBoundary } from './Components/ErrorBoundary'
import { NotFoundErrorPage } from './Components/NotFoundErrorPage'
import { Toasts } from './Components/Toasts'
import { DesignAdjustments } from './Components/DesignAdjustments'
import { SinglePageSite } from './Components/SinglePageSite'
import { Favicon } from './Components/Favicon'

export function App({
  appWrapperRef,
}: {
  appWrapperRef?: React.RefCallback<HTMLElement>
}) {
  return (
    <ErrorBoundary>
      <div ref={appWrapperRef} id="app-wrapper">
        <SkipToContent />
        <DesignAdjustments>
          <SinglePageSite>
            <CurrentPage />
            <NotFoundErrorPage />
            <Favicon />
            <CurrentPageMetadata />
          </SinglePageSite>
        </DesignAdjustments>
        <Toasts />
      </div>
    </ErrorBoundary>
  )
}

const SkipToContent = connect(function SkipToContent() {
  return (
    <div className="skippy visually-hidden-focusable overflow-hidden">
      <div className="container my-4">
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
