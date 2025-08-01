import { isEditorLoggedIn } from 'scrivito'

import './Data'
import './Objs'
import './Widgets'
import { configure } from './config'
import { verifySameWhoAmIUser } from './Data/CurrentUser/verifySameWhoAmIUser'
import { renderOrHydrateApp } from './renderOrHydrateApp'
import { getJrPlatformInstanceId } from './privateJrPlatform/multiTenancy'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { JrPlatformMissingTenant } from './privateJrPlatform/Components/JrPlatformMissingTenant'
import { isJrPlatformValidContentFormat } from './privateJrPlatform/isJrPlatformValidContentFormat'
import { JrPlatformWrongContentFormat } from './privateJrPlatform/Components/JrPlatformWrongContentFormat'
import { ensureSiteIsPresent } from './multiSite/ensureSiteIsPresent'

boot()

async function boot() {
  const rootElement = document.getElementById('root')
  if (!rootElement) throw new Error("Root element with id 'root' not found")

  if (import.meta.env.PRIVATE_JR_PLATFORM) {
    if (!getJrPlatformInstanceId()) {
      return createRoot(rootElement).render(
        <StrictMode>
          <JrPlatformMissingTenant />
        </StrictMode>,
      )
    }
  }

  configure()

  if (import.meta.env.PRIVATE_JR_PLATFORM) {
    if (!(await isJrPlatformValidContentFormat())) {
      return createRoot(rootElement).render(
        <StrictMode>
          <JrPlatformWrongContentFormat />
        </StrictMode>,
      )
    }
  }
  ensureSiteIsPresent()
  verifySameWhoAmIUser()

  renderOrHydrateApp(rootElement)

  if (isEditorLoggedIn()) {
    import('./assets/stylesheets/scrivitoEditing.scss')
    import('./Data/editingConfigs')
    import('./Objs/editingConfigs')
    import('./Widgets/editingConfigs')
  }
}
