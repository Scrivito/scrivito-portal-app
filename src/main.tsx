import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { isEditorLoggedIn } from 'scrivito'

import './Data'
import './Objs'
import './Widgets'
import { App } from './App'
import { configure } from './config'
import { ensureSiteIsPresent } from './config/scrivitoSites'

configure()
ensureSiteIsPresent()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (isEditorLoggedIn()) {
  import('./assets/stylesheets/scrivitoEditing.scss')
  import('./Data/editingConfigs')
  import('./Objs/editingConfigs')
  import('./Widgets/editingConfigs')
}
