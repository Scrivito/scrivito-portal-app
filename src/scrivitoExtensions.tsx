import { createRoot } from 'react-dom/client'
import { Extensions } from 'scrivito'
import './Data'
import './Data/editingConfigs'
import './Objs'
import './Objs/editingConfigs'
import './Widgets'
import './Widgets/editingConfigs'
import { configure } from './config'
import './assets/stylesheets/index.css'
import './assets/stylesheets/scrivitoExtensions.scss'

createRoot(document.createElement('div')).render(<Extensions />)

configure()
