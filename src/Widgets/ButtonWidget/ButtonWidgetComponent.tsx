import * as Scrivito from 'scrivito'
import { WrapIfClassName } from '../../Components/WrapIfClassName'
import { ButtonWidget } from './ButtonWidgetClass'

Scrivito.provideComponent(ButtonWidget, ({ widget }) => {
  const target = widget.get('target')
  let text = target && target.title()
  if (!text) {
    text = 'Provide the button link and text in the widget properties.'
  }

  const buttonClassNames = ['btn']
  buttonClassNames.push(widget.get('buttonColor') || 'btn-primary')

  const buttonSize = buttonSizeClassName(widget.get('buttonSize'))
  if (buttonSize) buttonClassNames.push(buttonSize)

  return (
    <WrapIfClassName
      className={alignmentClassNameWithBlock(widget.get('alignment'))}
    >
      <Scrivito.LinkTag to={target} className={buttonClassNames.join(' ')}>
        {text}
      </Scrivito.LinkTag>
    </WrapIfClassName>
  )
})

function alignmentClassName(
  widgetAlignment: string | null
): string | undefined {
  if (widgetAlignment === 'center') return 'text-center'
  if (widgetAlignment === 'right') return 'text-end'
  if (widgetAlignment === 'block') return 'btn-block'
}

function buttonSizeClassName(buttonSize: string | null) {
  if (buttonSize === 'small') return 'btn-sm'
  if (buttonSize === 'large') return 'btn-lg'
}
