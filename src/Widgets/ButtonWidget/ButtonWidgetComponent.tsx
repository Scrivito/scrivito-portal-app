import { provideComponent, LinkTag } from 'scrivito'
import { ButtonWidget } from './ButtonWidgetClass'

provideComponent(ButtonWidget, ({ widget }) => {
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
    <WrapIfClassName className={alignmentClassName(widget.get('alignment'))}>
      <LinkTag to={target} className={buttonClassNames.join(' ')}>
        {text}
      </LinkTag>
    </WrapIfClassName>
  )
})

function WrapIfClassName({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return className ? (
    <div className={className}>{children}</div>
  ) : (
    <>{children}</>
  )
}

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
