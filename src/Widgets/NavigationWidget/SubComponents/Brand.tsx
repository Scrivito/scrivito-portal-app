import { connect, InPlaceEditingOff, LinkTag, ImageTag } from 'scrivito'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'

export const Brand = connect(function Brand({
  root,
  linkClassName,
  alt,
}: {
  root: HomepageInstance
  alt: string
  linkClassName?: string
}) {
  return (
    <InPlaceEditingOff>
      <LinkTag to={root} className={linkClassName}>
        <ImageTag
          content={root}
          attribute="siteLogoDark"
          className="navbar-brand-logo"
          alt={alt}
        />
      </LinkTag>
    </InPlaceEditingOff>
  )
})
