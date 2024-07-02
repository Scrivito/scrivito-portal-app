import { provideComponent } from 'scrivito'
import { Page } from './PageObjClass'
import { DataBatchContextProvider } from '../../Components/DataBatchContext'

provideComponent(Page, ({ page }) => {
  return (
    <DataBatchContextProvider key={page.id()} content={page} attribute="body" />
  )
})
