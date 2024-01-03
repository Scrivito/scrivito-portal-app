import { Extensions } from 'scrivito'
import * as ReactDOM from 'react-dom/client'
import './Data'
import './Data/editingConfigs'
import './Extensions'
import './Objs'
import './Objs/editingConfigs'
import './Widgets'
import './Widgets/editingConfigs'
import { configure } from './config'

ReactDOM.createRoot(document.createElement('div')).render(<Extensions />)

configure()
