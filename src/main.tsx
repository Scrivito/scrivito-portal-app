import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { isEditorLoggedIn, preload, updateContent } from 'scrivito'

import './Data'
import './Objs'
import './Widgets'
import { App } from './App'
import { configure } from './config'
import { ensureSiteIsPresent } from './config/scrivitoSites'
import { verifySameWhoAmIUser } from './Data/CurrentUser/verifySameWhoAmIUser'
import { getJrPlatformApp } from './privateJrPlatform/getJrPlatformApp'

const container = document.getElementById('root')
if (!container) throw new Error("Root element with id 'root' not found")

configure()
ensureSiteIsPresent()
verifySameWhoAmIUser()

renderOrHydrateApp(container)

declare global {
  interface Window {
    preloadDump?: unknown
  }
}

function renderOrHydrateApp(container: HTMLElement) {
  if (typeof window.preloadDump === 'string') {
    return preload(window.preloadDump).then(({ dumpLoaded }) => {
      delete window.preloadDump

      if (dumpLoaded) return hydrateApp(container)

      return renderApp(container)
    })
  }

  renderApp(container)
}

async function renderApp(container: HTMLElement) {
  const RootComponent = await getRootComponent()

  createRoot(container).render(
    <StrictMode>
      <RootComponent />
    </StrictMode>,
  )
}

async function getRootComponent() {
  if (import.meta.env.PRIVATE_JR_PLATFORM) return getJrPlatformApp()

  return App
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

if (isEditorLoggedIn()) {
  import('./assets/stylesheets/scrivitoEditing.scss')
  import('./Data/editingConfigs')
  import('./Objs/editingConfigs')
  import('./Widgets/editingConfigs')
}
