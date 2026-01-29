import {
  isInPlaceEditingActive,
  LinkTag,
  provideComponent,
  WidgetTag,
} from 'scrivito'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { ButtonWidget } from './ButtonWidgetClass'
import { ensureString } from '../../utils/ensureString'
import { buttonSizeClassName } from '../../utils/buttonSizeClassName'
import { applyPadding } from '../propertiesGroups/padding/applyPadding'

provideComponent(ButtonWidget, ({ widget }) => {
  const target = widget.get('target')
  const title = ensureString(target?.title())

  const buttonClassNames = ['btn']
  buttonClassNames.push(widget.get('buttonColor') || 'btn-primary')

  const buttonSize = buttonSizeClassName(widget.get('buttonSize'))
  if (buttonSize) buttonClassNames.push(buttonSize)

  return (
    <WidgetTag
      className={alignmentClassNameWithBlock(widget.get('alignment'))}
      style={applyPadding(widget)}
    >
      <LinkTag to={target} className={buttonClassNames.join(' ')}>
        {!title && isInPlaceEditingActive()
          ? 'Provide the button link and text in the widget properties.'
          : title}
      </LinkTag>
    </WidgetTag>
  )
})
