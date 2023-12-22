import { Link, LinkTag } from 'scrivito'

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
  title,
}: {
  icon: string
  size: string | null
  link: Link | null
  title?: string
}) {
  if (!link) return <Icon icon={icon} size={size} title={title} />

  const linkTitle = title || link.title() || ''

  return (
    <LinkTag to={link} aria-label={linkTitle}>
      <Icon icon={icon} size={size} title={linkTitle} />
    </LinkTag>
  )
}
