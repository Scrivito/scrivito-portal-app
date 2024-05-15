import { provideComponent } from 'scrivito'
import { DataGroupWidget } from './DataGroupWidgetClass'
import { DataBatchContextProvider } from '../../Components/DataBatchContext'

provideComponent(DataGroupWidget, ({ widget }) => (
  <DataBatchContextProvider content={widget} attribute="content" />
))
