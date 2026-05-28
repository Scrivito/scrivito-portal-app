import { provideComponent, ContentTag } from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { slugify } from '@justrelate/slugify'

provideComponent(HeadlineWidget, ({ widget }) => {
  const classNames: string[] = []

  const style = widget.get('style') || 'h2'
  if (style === 'label-headline') {
    classNames.push('font-bold', 'text-[0.65rem]')
  } else if (style === 'label-subtitle') {
    classNames.push('text-xs', 'leading-[1.75]')
  } else {
    classNames.push(style)
  }

  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  if (widget.get('uppercase')) classNames.push('uppercase')

  const marginBottom = widget.get('margin') ?? 'mb-2'
  classNames.push(tailwindMarginBottomFor(marginBottom))

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

const tailwindMarginBottomClassNames: Record<string, string> = {
  'mb-0': 'mb-0',
  'mb-1': 'mb-1',
  'mb-2': 'mb-2',
  'mb-3': 'mb-4',
  'mb-4': 'mb-6',
  'mb-5': 'mb-12',
}

function tailwindMarginBottomFor(marginBottom: string): string {
  const className = tailwindMarginBottomClassNames[marginBottom]
  if (className === undefined) {
    throw new Error(`Unknown margin: ${marginBottom}`)
  }
  return className
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
