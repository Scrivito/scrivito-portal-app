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

provideComponent(ButtonWidget, ({ widget }) => {
  const target = widget.get('target')
  const title = ensureString(target?.title())

  const buttonColor = widget.get('buttonColor') || 'btn-primary'
  const buttonColorCustom = widget.get('buttonColorCustom')

  const buttonClassNames = ['btn']
  let buttonStyle: React.CSSProperties | undefined

  if (
    (buttonColor === 'custom' || buttonColor === 'custom-outline') &&
    buttonColorCustom
  ) {
    if (buttonColor === 'custom') {
      buttonClassNames.push('btn-custom')
      buttonStyle = {
        '--btn-color': buttonColorCustom,
      } as React.CSSProperties
    } else if (buttonColor === 'custom-outline') {
      buttonClassNames.push('btn-outline-custom')
      buttonStyle = {
        '--btn-color': buttonColorCustom,
      } as React.CSSProperties
    }
  } else {
    buttonClassNames.push(buttonColor)
  }

  const buttonSize = buttonSizeClassName(widget.get('buttonSize'))
  if (buttonSize) buttonClassNames.push(buttonSize)

  return (
    <WidgetTag className={alignmentClassNameWithBlock(widget.get('alignment'))}>
      <LinkTag
        to={target}
        className={buttonClassNames.join(' ')}
        style={buttonStyle}
      >
        {!title && isInPlaceEditingActive()
          ? 'Provide the button link and text in the widget properties.'
          : title}
      </LinkTag>
    </WidgetTag>
  )
})
