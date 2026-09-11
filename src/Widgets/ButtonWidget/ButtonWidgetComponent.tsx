import {
  isInPlaceEditingActive,
  LinkTag,
  provideComponent,
  WidgetTag,
} from 'scrivito'
import { ButtonWidget } from './ButtonWidgetClass'
import { ensureString } from '../../utils/ensureString'
import { buttonColorClassName } from '../../utils/theme/buttonColorClassName'

provideComponent(ButtonWidget, ({ widget }) => {
  const target = widget.get('target')
  const title = ensureString(target?.title())

  const buttonClassNames = ['btn-portal']

  const buttonColor = widget.get('buttonColor') || 'btn-primary'
  buttonClassNames.push(buttonColorClassName(buttonColor))

  const buttonSize = widget.get('buttonSize') || 'medium'
  if (buttonSize === 'small') buttonClassNames.push('px-2', 'py-1', 'text-sm')
  if (buttonSize === 'large') buttonClassNames.push('px-4', 'py-2', 'text-lg')

  const widgetTagClassNames: string[] = []
  const alignment = widget.get('alignment')
  if (alignment === 'block') buttonClassNames.push('w-full')
  if (alignment === 'center') widgetTagClassNames.push('text-center')
  if (alignment === 'right') widgetTagClassNames.push('text-right')

  return (
    <WidgetTag className={widgetTagClassNames.join(' ')}>
      <LinkTag to={target} className={buttonClassNames.join(' ')}>
        {!title && isInPlaceEditingActive()
          ? 'Provide the button link and text in the widget properties.'
          : title}
      </LinkTag>
    </WidgetTag>
  )
})
