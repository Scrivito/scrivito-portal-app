import { provideComponent, ContentTag, WidgetTag } from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { applyTextStyle } from '../propertiesGroups/textStyle/applyTextStyle'
import { applyPadding } from '../propertiesGroups/padding/applyPadding'
import { marginBottomToPixels } from '../propertiesGroups/padding/marginBottomToPixels'
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

  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  return (
    <WidgetTag
      style={applyPadding(widget, {
        paddingBottom: marginBottomToPixels(widget.get('margin')),
      })}
    >
      <ContentTag
        content={widget}
        attribute="headline"
        className={classNames.join(' ')}
        style={applyTextStyle(widget, {
          textTransform: widget.get('uppercase') ? 'uppercase' : undefined,
        })}
        tag={tag(widget.get('level'), style)}
        id={slugify(widget.get('headline'))}
      />
    </WidgetTag>
  )
})

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
