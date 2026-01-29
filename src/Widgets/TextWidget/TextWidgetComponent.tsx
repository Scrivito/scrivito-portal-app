import { provideComponent, ContentTag, WidgetTag } from 'scrivito'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { applyTextStyle } from '../propertiesGroups/textStyle/applyTextStyle'
import { applyPadding } from '../propertiesGroups/padding/applyPadding'
import { TextWidget } from './TextWidgetClass'

provideComponent(TextWidget, ({ widget }) => (
  <WidgetTag style={applyPadding(widget)}>
    <ContentTag
      attribute="text"
      className={alignmentClassName(widget.get('alignment'))}
      content={widget}
      style={applyTextStyle(widget)}
      tag="div"
    />
  </WidgetTag>
))
