import { provideComponent, ContentTag } from 'scrivito'
import { GroupWidget } from './GroupWidgetClass'

provideComponent(GroupWidget, ({ widget }) => (
  <ContentTag design content={widget} attribute="content" />
))
