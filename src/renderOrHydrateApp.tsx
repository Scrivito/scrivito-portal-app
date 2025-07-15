import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { preload, updateContent } from 'scrivito'

import './Data'
import './Objs'
import './Widgets'
import { App } from './App'

declare global {
  interface Window {
    preloadDump?: unknown
  }
}

export function renderOrHydrateApp(container: HTMLElement) {
  if (typeof window.preloadDump === 'string') {
    return preload(window.preloadDump).then(({ dumpLoaded }) => {
      delete window.preloadDump

      if (dumpLoaded) return hydrateApp(container)

      return renderApp(container)
    })
  }

  renderApp(container)
}

function renderApp(container: HTMLElement) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

function hydrateApp(container: HTMLElement) {
  hydrateRoot(
    container,
    <StrictMode>
      <App
        appWrapperRef={(el) => {
          if (el) updateContent()
        }}
      />
    </StrictMode>,
  )
}
