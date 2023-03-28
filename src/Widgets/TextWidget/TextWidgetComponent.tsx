import * as Scrivito from 'scrivito'
import { TextWidget } from './TextWidgetClass'

Scrivito.provideComponent(TextWidget, ({ widget }) => (
  <Scrivito.ContentTag tag="div" content={widget} attribute="text" />
))
