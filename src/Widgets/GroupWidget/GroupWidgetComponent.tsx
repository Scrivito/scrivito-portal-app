import { provideComponent, ContentTag } from 'scrivito'
import { GroupWidget } from './GroupWidgetClass'

provideComponent(GroupWidget, ({ widget }) => (
  <ContentTag content={widget} attribute="content" />
))
