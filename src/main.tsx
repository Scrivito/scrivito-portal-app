import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { isEditorLoggedIn, preload, updateContent } from 'scrivito'

import './Data'
import './Objs'
import './Widgets'
import { App } from './App'
import { configure } from './config'
import { ensureSiteIsPresent } from './config/scrivitoSites'

configure()
ensureSiteIsPresent()

declare global {
  interface Window {
    preloadDump?: unknown
  }
}

if (typeof window.preloadDump === 'string') {
  preload(window.preloadDump).then(({ dumpLoaded }) => {
    delete window.preloadDump

    if (dumpLoaded) hydrateApp()
    else renderApp()
  })
} else renderApp()

function renderApp() {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

function hydrateApp() {
  hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <StrictMode>
      <App
        appWrapperRef={(el) => {
          if (el) updateContent()
        }}
      />
    </StrictMode>,
  )
}

if (isEditorLoggedIn()) {
  import('./assets/stylesheets/scrivitoEditing.scss')
  import('./Data/editingConfigs')
  import('./Objs/editingConfigs')
  import('./Widgets/editingConfigs')
}
