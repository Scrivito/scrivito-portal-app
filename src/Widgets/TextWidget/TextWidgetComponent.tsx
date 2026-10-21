import { provideComponent, ContentTag, designProps } from 'scrivito'
import { TextWidget } from './TextWidgetClass'

provideComponent(TextWidget, ({ widget }) => (
  <ContentTag
    {...designProps(widget.get('design'))}
    attribute="text"
    content={widget}
    tag="div"
  />
))
