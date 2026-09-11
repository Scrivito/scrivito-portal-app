import {
  ensureUserIsLoggedIn,
  isEditorLoggedIn,
  isInPlaceEditingActive,
  isUserLoggedIn,
  provideComponent,
  WidgetTag,
} from 'scrivito'
import { LogInButtonWidget } from './LogInButtonWidgetClass'
import { buttonColorClassName } from '../../utils/theme/buttonColorClassName'

provideComponent(LogInButtonWidget, ({ widget }) => {
  if (isUserLoggedIn() && !isEditorLoggedIn()) return null
  const title = widget.get('title')

  const buttonClassNames = ['btn-portal']
  const widgetTagClassNames: string[] = []

  const buttonColor = widget.get('buttonColor') || 'btn-primary'
  buttonClassNames.push(buttonColorClassName(buttonColor))

  const buttonSize = widget.get('buttonSize') || 'medium'
  if (buttonSize === 'small') buttonClassNames.push('px-2', 'py-1', 'text-sm')
  if (buttonSize === 'large') buttonClassNames.push('px-4', 'py-2', 'text-lg')

  const alignment = widget.get('alignment')
  if (alignment === 'block') buttonClassNames.push('w-full')
  if (alignment === 'center') widgetTagClassNames.push('text-center')
  if (alignment === 'right') widgetTagClassNames.push('text-right')

  return (
    <WidgetTag className={widgetTagClassNames.join(' ')}>
      <button
        className={buttonClassNames.join(' ')}
        onClick={() => ensureUserIsLoggedIn()}
      >
        {!title && isInPlaceEditingActive()
          ? 'Provide the button title in the widget properties.'
          : title}
      </button>
    </WidgetTag>
  )
})
