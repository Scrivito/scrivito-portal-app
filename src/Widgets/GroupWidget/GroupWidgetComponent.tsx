import * as Scrivito from 'scrivito'
import { GroupWidget } from './GroupWidgetClass'

Scrivito.provideComponent(GroupWidget, ({ widget }) => (
  <Scrivito.ContentTag content={widget} attribute="content" />
))
