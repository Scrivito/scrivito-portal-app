import { provideComponent } from 'scrivito'
import { EventPage } from './EventPageObjClass'
import { DataBatchContextProvider } from '../../Components/DataBatchContext'

provideComponent(EventPage, ({ page }) => (
  <DataBatchContextProvider
    tag="main"
    id="main"
    key={page.id()}
    content={page}
    attribute="body"
  />
))
