import * as Scrivito from 'scrivito'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { TextWidget } from './TextWidgetClass'

Scrivito.provideComponent(TextWidget, ({ widget }) => (
  <Scrivito.ContentTag
    attribute="text"
    className={alignmentClassName(widget.get('alignment'))}
    content={widget}
    tag="div"
  />
))
