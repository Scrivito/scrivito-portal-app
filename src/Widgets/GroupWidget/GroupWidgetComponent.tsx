import { provideComponent, ContentTag } from 'scrivito'
import { applyPadding } from '../propertiesGroups/padding/applyPadding'
import { GroupWidget } from './GroupWidgetClass'

provideComponent(GroupWidget, ({ widget }) => (
  <ContentTag
    content={widget}
    attribute="content"
    style={applyPadding(widget)}
  />
))
