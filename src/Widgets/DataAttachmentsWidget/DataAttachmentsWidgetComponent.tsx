import { provideComponent } from 'scrivito'
import { DataAttachmentsWidget } from './DataAttachmentsWidgetClass'

provideComponent(DataAttachmentsWidget, ({ widget }) => {
  return <div>My Attachments!</div>
})
