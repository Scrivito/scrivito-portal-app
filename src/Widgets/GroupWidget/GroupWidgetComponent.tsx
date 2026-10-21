import { provideComponent, ContentTag, designProps } from 'scrivito'
import { GroupWidget } from './GroupWidgetClass'

provideComponent(GroupWidget, ({ widget }) => (
  <ContentTag
    {...designProps(widget.get('design'))}
    content={widget}
    attribute="content"
  />
))
