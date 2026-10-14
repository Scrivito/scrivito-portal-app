import { Link, LinkTag } from 'scrivito'

/**
 * Renders a Bootstrap Icon (stored as "bi-<name>") from an individual SVG file
 * in `public/icons`.
 *
 * The SVG is used as a CSS mask on a `currentColor` background instead of being
 * inlined. Browsers treat it as a static image then, so scripts or event
 * handlers inside the file can never run. An unknown icon name renders nothing.
 */
export function SvgIcon({
  icon,
  imageUrl,
  className,
  title,
}: {
  icon: string
  imageUrl?: string
  className?: string
  title?: string
}) {
  const name = (icon || 'bi-box').replace(/^bi-/, '')
  const mask = `url("${
    imageUrl ??
    `${import.meta.env.BASE_URL}icons/${encodeURIComponent(name)}.svg`
  }")`

  return (
    <i
      className={['bi', 'bi-svg', className].filter(Boolean).join(' ')}
      aria-hidden="true"
      title={title}
      style={{ maskImage: mask }}
    />
  )
}

function Icon({
  icon,
  imageUrl,
  size,
  title,
}: {
  icon: string
  imageUrl?: string
  size: string | null
  title?: string
}) {
  return (
    <SvgIcon
      icon={icon}
      imageUrl={imageUrl}
      className={size ?? undefined}
      title={title}
    />
  )
}

export function IconComponent({
  icon,
  imageUrl,
  size,
  link,
  title,
}: {
  icon: string
  /** If set, this image is used as the icon shape instead of the Bootstrap icon. */
  imageUrl?: string
  size: string | null
  link: Link | null
  title?: string
}) {
  if (!link) {
    return <Icon icon={icon} imageUrl={imageUrl} size={size} title={title} />
  }

  const linkTitle = title || link.title() || ''

  return (
    <LinkTag to={link} aria-label={linkTitle}>
      <Icon icon={icon} imageUrl={imageUrl} size={size} title={linkTitle} />
    </LinkTag>
  )
}
