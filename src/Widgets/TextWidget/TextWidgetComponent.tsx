import { provideComponent, ContentTag } from 'scrivito'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { TextWidget } from './TextWidgetClass'

provideComponent(TextWidget, ({ widget }) => (
  <ContentTag
    attribute="text"
    className={alignmentClassName(widget.get('alignment'))}
    content={widget}
    tag="div"
  />
))
