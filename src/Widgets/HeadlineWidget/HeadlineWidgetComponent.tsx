import { provideComponent, ContentTag } from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'
import speakingUrl from 'speakingurl'
import { alignmentClassName } from '../../utils/alignmentClassName'

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

  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  if (widget.get('uppercase')) classNames.push('text-uppercase')

  return (
    <ContentTag
      content={widget}
      attribute="headline"
      className={classNames.join(' ')}
      tag={tag(widget.get('level'), style)}
      id={speakingUrl(widget.get('headline'))}
    />
  )
})

function tag(level: string | null, style: string): string {
  if (level) return level

  if (style === 'label-headline') return 'div'
  if (style === 'label-subtitle') return 'div'

  return style
}
