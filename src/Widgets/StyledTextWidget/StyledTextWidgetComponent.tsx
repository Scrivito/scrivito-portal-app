import * as Scrivito from 'scrivito'
import { StyledTextWidget } from './StyledTextWidgetClass'

Scrivito.provideComponent(StyledTextWidget, ({ widget }) => {
  const classNames: string[] = []

  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  if (widget.get('bold')) classNames.push('text-bold')

  const opacity = widget.get('opacity')
  if (opacity && opacity !== 'opacity-100') classNames.push(opacity)

  const size = widget.get('size')
  if (size && size !== 'body-font-size') classNames.push(size)

  if (widget.get('uppercase')) classNames.push('text-uppercase')

  return (
    <Scrivito.ContentTag
      attribute="text"
      className={classNames.join(' ') + ' styled-text-widget'}
      content={widget}
      tag={widget.get('multiline') ? 'pre' : 'div'}
    />
  )
})

function alignmentClassName(
  widgetAlignment: string | null
): string | undefined {
  if (widgetAlignment === 'center') return 'text-center'
  if (widgetAlignment === 'right') return 'text-end'
}
