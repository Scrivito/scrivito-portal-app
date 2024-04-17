import { provideComponent, ContentTag } from 'scrivito'
import { Page } from './PageObjClass'
import { DataScopeParamsContextProvider } from '../../Components/DataScopeParamsContext'

provideComponent(Page, ({ page }) => (
  <DataScopeParamsContextProvider>
    <ContentTag tag="div" content={page} attribute="body" />
  </DataScopeParamsContextProvider>
))
