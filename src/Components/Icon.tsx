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
}: {
  icon: string
  size: string | null
  link: Link | null
}) {
  if (!link) return <Icon icon={icon} size={size} />

  const title = link.title() || ''

  return (
    <LinkTag to={link} aria-label={title}>
      <li className="list-inline-item">
        <a className="btn btn-soft-secondary btn-xs btn-icon" href="#">
          <Icon icon={icon} size={size} title={title} />
        </a>
      </li>
    </LinkTag>
  )
}
