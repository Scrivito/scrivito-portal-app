import { provideComponent, ContentTag } from 'scrivito'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { applyTextStyle } from '../propertiesGroups/textStyle/applyTextStyle'
import { TextWidget } from './TextWidgetClass'

provideComponent(TextWidget, ({ widget }) => (
  <ContentTag
    attribute="text"
    className={alignmentClassName(widget.get('alignment'))}
    content={widget}
    style={applyTextStyle(widget)}
    tag="div"
  />
))
