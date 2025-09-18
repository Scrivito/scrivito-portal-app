import { provideComponent, ContentTag } from 'scrivito'
import { TextWidget } from './TextWidgetClass'

provideComponent(TextWidget, ({ widget }) => {
  const classNames: string[] = []

  const rawAlignment = widget.get('alignment') || 'left'
  const rawAlignmentTablet = widget.get('alignmentTablet') || rawAlignment
  const rawAlignmentMobile = widget.get('alignmentMobile') || rawAlignment

  if (
    rawAlignment === rawAlignmentTablet &&
    rawAlignment === rawAlignmentMobile
  ) {
    if (rawAlignment !== 'left') {
      classNames.push(`text-${normalizeAlignment(rawAlignment)}`)
    }
  } else {
    classNames.push(
      `text-lg-${normalizeAlignment(rawAlignment)}`,
      `text-md-${normalizeAlignment(rawAlignmentTablet)}`,
      `text-${normalizeAlignment(rawAlignmentMobile)}`,
    )
  }

  return (
    <ContentTag
      attribute="text"
      className={classNames.join(' ')}
      content={widget}
      tag="div"
    />
  )
})

function normalizeAlignment(alignment: string): 'start' | 'center' | 'end' {
  if (alignment === 'center') return 'center'
  if (alignment === 'right') return 'end'
  return 'start'
}
