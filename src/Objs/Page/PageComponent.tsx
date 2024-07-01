import { provideComponent } from 'scrivito'
import { Page } from './PageObjClass'
import { DataBatchContextProvider } from '../../Components/DataBatchContext'

provideComponent(Page, ({ page }) => (
  <main id="main">
    <DataBatchContextProvider content={page} attribute="body" />
  </main>
))
