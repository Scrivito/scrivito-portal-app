import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { preload, updateContent } from 'scrivito'

import './Data'
import './Objs'
import './Widgets'
import { App } from './App'

export function renderOrHydrateApp(container: HTMLElement) {
  const preloadElement = document.getElementById('preload-dump')
  const preloadDump = preloadElement?.textContent

  if (preloadDump) {
    return preload(preloadDump).then(({ dumpLoaded }) => {
      preloadElement?.remove()

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
