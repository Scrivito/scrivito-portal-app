import { ContentTag, provideComponent } from 'scrivito'
import { DataGroupWidget } from './DataGroupWidgetClass'

provideComponent(DataGroupWidget, ({ widget }) => (
  <ContentTag content={widget} attribute="content" />
))
