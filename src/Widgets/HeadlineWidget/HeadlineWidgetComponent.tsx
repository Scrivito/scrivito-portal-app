import { provideComponent, ContentTag } from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'
import { slugify } from '@justrelate/slugify'

provideComponent(HeadlineWidget, ({ widget }) => {
  const classNames: string[] = []

  const style = widget.get('style') || 'h2'
  if (style === 'label-headline') {
    classNames.push('text-bold', 'text-extra-small')
  } else if (style === 'label-subtitle') {
    classNames.push('text-small')
  } else {
    classNames.push(style)
  }

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

  if (widget.get('uppercase')) classNames.push('text-uppercase')

  classNames.push(widget.get('margin') ?? 'mb-2')

  return (
    <ContentTag
      content={widget}
      attribute="headline"
      className={classNames.join(' ')}
      tag={tag(widget.get('level'), style)}
      id={slugify(widget.get('headline'))}
    />
  )
})

function normalizeAlignment(alignment: string): 'start' | 'center' | 'end' {
  if (alignment === 'center') return 'center'
  if (alignment === 'right') return 'end'
  return 'start'
}

function tag(level: string | null, style: string): string {
  if (level) return level

  if (style === 'display-1') return 'h1'
  if (style === 'display-2') return 'h2'
  if (style === 'display-3') return 'h3'
  if (style === 'display-4') return 'h4'
  if (style === 'display-5') return 'h5'
  if (style === 'display-6') return 'h6'
  if (style === 'label-headline') return 'div'
  if (style === 'label-subtitle') return 'div'

  return style
}
