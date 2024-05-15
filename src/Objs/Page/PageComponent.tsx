import { provideComponent } from 'scrivito'
import { Page } from './PageObjClass'
import { DataBatchContextProvider } from '../../Components/DataBatchContext'

provideComponent(Page, ({ page }) => (
  <DataBatchContextProvider content={page} attribute="body" />
))
