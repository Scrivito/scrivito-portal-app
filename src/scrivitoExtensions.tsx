import { Extensions } from 'scrivito'
import { createRoot } from 'react-dom/client'
import './Data'
import './Data/editingConfigs'
import './Objs'
import './Objs/editingConfigs'
import './Widgets'
import './Widgets/editingConfigs'
import { configure } from './config'

createRoot(document.createElement('div')).render(<Extensions />)

configure()
