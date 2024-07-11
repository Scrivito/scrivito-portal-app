import { provideComponent } from 'scrivito'
import { Page } from './PageObjClass'
import { DataBatchContextProvider } from '../../Components/DataBatchContext'

provideComponent(Page, ({ page }) => (
  <DataBatchContextProvider
    tag="main"
    id="main"
    key={page.id()}
    content={page}
    attribute="body"
  />
))
