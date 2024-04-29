import { ContentTag, provideComponent } from 'scrivito'
import { DataGroupWidget } from './DataGroupWidgetClass'
import { DataBatchContextProvider } from '../../Components/DataBatchContext'

provideComponent(DataGroupWidget, ({ widget }) => (
  <DataBatchContextProvider>
    <ContentTag content={widget} attribute="content" />
  </DataBatchContextProvider>
))
