import * as Scrivito from 'scrivito'
import { WrapIfClassName } from '../../Components/WrapIfClassName'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { IconWidget } from './IconWidgetClass'

Scrivito.provideComponent(IconWidget, ({ widget }) => {
  return (
    <WrapIfClassName
      className={alignmentClassNameWithBlock(widget.get('alignment'))}
    >
      <IconComponent
        icon={widget.get('icon')}
        size={widget.get('size')}
        link={widget.get('link')}
      />
    </WrapIfClassName>
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
  link: Scrivito.Link | null
}) {
  if (!link) return <Icon icon={icon} size={size} />

  const title = link.title() || ''

  return (
    <Scrivito.LinkTag to={link} aria-label={title}>
      <Icon icon={icon} size={size} title={title} />
    </Scrivito.LinkTag>
  )
}
