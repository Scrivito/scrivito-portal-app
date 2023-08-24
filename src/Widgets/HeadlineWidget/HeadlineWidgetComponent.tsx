import { provideComponent, ContentTag } from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'
import speakingUrl from 'speakingurl'
import { alignmentClassName } from '../../utils/alignmentClassName'

provideComponent(HeadlineWidget, ({ widget }) => {
  const style = widget.get('style') || 'h2'
  const level = widget.get('level') || style
  const classNames = [style]

  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  if (widget.get('uppercase')) classNames.push('text-uppercase')

  return (
    <ContentTag
      content={widget}
      attribute="headline"
      className={classNames.join(' ')}
      tag={level}
      id={speakingUrl(widget.get('headline'))}
    />
  )
})
