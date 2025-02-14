import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import {
  isEditorLoggedIn,
  isUserLoggedIn,
  preload,
  updateContent,
} from 'scrivito'

import './Data'
import './Objs'
import './Widgets'
import { App } from './App'
import { configure } from './config'
import { ensureSiteIsPresent } from './config/scrivitoSites'
import { setPisaAuthorization } from './Data/pisaClient'

const JwtTokenName = 'token'

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

setPisaAuthorization(authorization())

function authorization(): string | null {
  if (isUserLoggedIn()) return null

  if (typeof window === 'undefined') return null

  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get(JwtTokenName)

  return token ? `JWT ${token}` : null
}
