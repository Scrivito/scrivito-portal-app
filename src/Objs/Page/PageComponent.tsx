import { provideComponent, ContentTag } from 'scrivito'
import { Page } from './PageObjClass'
import { DataBatchContextProvider } from '../../Components/DataBatchContext'

provideComponent(Page, ({ page }) => (
  <DataBatchContextProvider>
    <ContentTag tag="div" content={page} attribute="body" />
  </DataBatchContextProvider>
))
