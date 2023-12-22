import {
  isInPlaceEditingActive,
  LinkTag,
  provideComponent,
  WidgetTag,
} from 'scrivito'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { ButtonWidget } from './ButtonWidgetClass'
import { ensureString } from '../../utils/ensureString'

provideComponent(ButtonWidget, ({ widget }) => {
  const target = widget.get('target')
  const title = ensureString(target?.title())

  const buttonClassNames = ['btn']
  buttonClassNames.push(widget.get('buttonColor') || 'btn-primary')

  const buttonSize = buttonSizeClassName(widget.get('buttonSize'))
  if (buttonSize) buttonClassNames.push(buttonSize)

  return (
    <WidgetTag className={alignmentClassNameWithBlock(widget.get('alignment'))}>
      <LinkTag
        to={target}
        className={buttonClassNames.join(' ')}
      >
        {!title && isInPlaceEditingActive()
          ? 'Provide the button link and text in the widget properties.'
          : title}
      </LinkTag>
    </WidgetTag>
  )
})

function buttonSizeClassName(buttonSize: string | null) {
  if (buttonSize === 'small') return 'btn-sm'
  if (buttonSize === 'large') return 'btn-lg'
}
