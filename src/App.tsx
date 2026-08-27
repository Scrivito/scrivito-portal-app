import {
  CurrentPage,
  unstable_DamImageSelector as DamImageSelector,
} from 'scrivito'
import { HelmetProvider, HelmetServerState } from 'react-helmet-async'

import * as React from 'react'

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
  const [selected, setSelected] = React.useState<string | null>(null)

  return (
    <HelmetProvider context={helmetContext}>
      <ErrorBoundary>
        <div ref={appWrapperRef} id="app-wrapper">
          <a href="#main" className="btn skip-to-content">
            Skip to Content
          </a>

          <DesignAdjustments>
            <SinglePageSite>
              <div
                style={{
                  height: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  font: '14px sans-serif',
                }}
              >
                <p style={{ padding: 8, margin: 0, background: '#eee' }}>
                  host origin: <b>{window.location.origin}</b> · selected:{' '}
                  {selected ?? '—'}
                </p>
                <div style={{ flex: 1 }}>
                  <DamImageSelector
                    onSelect={(o) => {
                      console.log(o?.id() ?? null)

                      setSelected(o?.id() ?? null)
                    }}
                  />
                </div>
              </div>

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
