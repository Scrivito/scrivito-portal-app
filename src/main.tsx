import { isEditorLoggedIn } from 'scrivito'

import './Data'
import './Objs'
import './Widgets'
import { configure } from './config'
import { ensureSiteIsPresent } from './config/scrivitoSites'
import { verifySameWhoAmIUser } from './Data/CurrentUser/verifySameWhoAmIUser'
import { renderOrHydrateApp } from './renderOrHydrateApp'

boot()

function boot() {
  const container = document.getElementById('root')
  if (!container) throw new Error("Root element with id 'root' not found")

  configure()
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
