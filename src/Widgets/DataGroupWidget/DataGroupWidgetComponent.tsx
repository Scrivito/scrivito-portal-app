import { ContentTag, provideComponent } from 'scrivito'
import { DataGroupWidget } from './DataGroupWidgetClass'
import { DataScopeParamsContextProvider } from '../../Components/DataBatchContext'

provideComponent(DataGroupWidget, ({ widget }) => (
  <DataScopeParamsContextProvider>
    <ContentTag content={widget} attribute="content" />
  </DataScopeParamsContextProvider>
))
