import * as Scrivito from 'scrivito'
import * as ReactDOM from 'react-dom/client'
import './Objs'
import './Widgets'
import { configure } from './config'

ReactDOM.createRoot(document.createElement('div')).render(
  <Scrivito.Extensions />
)

configure()
