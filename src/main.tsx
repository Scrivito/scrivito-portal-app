import { isEditorLoggedIn } from 'scrivito'

import './Data'
import './Objs'
import './Widgets'
import { configure } from './config'
import { ensureSiteIsPresent } from './config/scrivitoSites'
import { verifySameWhoAmIUser } from './Data/CurrentUser/verifySameWhoAmIUser'
import { renderOrHydrateApp } from './renderOrHydrateApp'
import { getJrPlatformInstanceId } from './privateJrPlatform/multiTenancy'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { JrPlatformMissingTenant } from './privateJrPlatform/Components/JrPlatformMissingTenant'
import { isJrPlatformValidContentFormat } from './privateJrPlatform/isJrPlatformValidContentFormat'
import { WrongContentFormat } from './privateJrPlatform/Components/WrongContentFormat'

boot()

async function boot() {
  const container = document.getElementById('root')
  if (!container) throw new Error("Root element with id 'root' not found")

  if (import.meta.env.PRIVATE_JR_PLATFORM) {
    if (!getJrPlatformInstanceId()) {
      return createRoot(container).render(
        <StrictMode>
          <JrPlatformMissingTenant />
        </StrictMode>,
      )
    }
  }

  configure()

  if (import.meta.env.PRIVATE_JR_PLATFORM) {
    if (!(await isJrPlatformValidContentFormat())) {
      return createRoot(container).render(
        <StrictMode>
          <WrongContentFormat />
        </StrictMode>,
      )
    }
  }
  ensureSiteIsPresent()
  verifySameWhoAmIUser()

  renderOrHydrateApp(container)

  if (isEditorLoggedIn()) {
    import('./assets/stylesheets/scrivitoEditing.scss')
    import('./Data/editingConfigs')
    import('./Objs/editingConfigs')
    import('./Widgets/editingConfigs')
  }
}
