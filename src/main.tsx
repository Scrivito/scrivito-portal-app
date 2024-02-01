import React from 'react'
import ReactDOM from 'react-dom/client'
import { isEditorLoggedIn } from 'scrivito'

import './Data'
import './Objs'
import './Widgets'
import { App } from './App'
import { configure } from './config'

configure()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

if (isEditorLoggedIn()) {
  import('./Data/editingConfigs')
  import('./Objs/editingConfigs')
  import('./Widgets/editingConfigs')
  import('./Extensions')
}
