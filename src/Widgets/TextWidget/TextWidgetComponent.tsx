import { provideComponent, ContentTag } from 'scrivito'
import { TextWidget } from './TextWidgetClass'

provideComponent(TextWidget, ({ widget }) => (
  <ContentTag design attribute="text" content={widget} tag="div" />
))
