import { ContentTag, provideComponent } from 'scrivito'
import { DataGroupWidget } from './DataGroupWidgetClass'
import { DataScopeParamsContextProvider } from '../../Components/DataScopeParamsContext'

provideComponent(DataGroupWidget, ({ widget }) => (
  <DataScopeParamsContextProvider>
    <ContentTag content={widget} attribute="content" />
  </DataScopeParamsContextProvider>
))
