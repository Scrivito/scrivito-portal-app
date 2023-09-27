import { Link, LinkTag, provideComponent, WidgetTag } from 'scrivito'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { IconWidget } from './IconWidgetClass'

provideComponent(IconWidget, ({ widget }) => {
  return (
    <WidgetTag className={alignmentClassNameWithBlock(widget.get('alignment'))}>
      <IconComponent
        icon={widget.get('icon')}
        size={widget.get('size')}
        link={widget.get('link')}
      />
    </WidgetTag>
  )
})

function Icon({
  icon,
  size,
  title,
}: {
  icon: string
  size: string | null
  title?: string
}) {
  const actualIcon = icon || 'bi-box'
  return (
    <i
      className={['bi', actualIcon, size].join(' ')}
      aria-hidden="true"
      title={title}
    />
  )
}

export function IconComponent({
  icon,
  size,
  link,
}: {
  icon: string
  size: string | null
  link: Link | null
}) {
  if (!link) return <Icon icon={icon} size={size} />

  const title = link.title() || ''

  return (
    <LinkTag to={link} aria-label={title}>
      <Icon icon={icon} size={size} title={title} />
    </LinkTag>
  )
}
