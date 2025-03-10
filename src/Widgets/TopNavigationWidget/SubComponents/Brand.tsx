import {
  connect,
  InPlaceEditingOff,
  LinkTag,
  ImageTag,
  Obj,
  Link,
} from 'scrivito'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'
import { alternativeTextForObj } from '../../../utils/alternativeTextForObj'

export const Brand = connect(function Brand({
  linkTo,
  root,
  linkClassName,
}: {
  linkTo: Obj | Link | null
  root: HomepageInstance
  linkClassName?: string
}) {
  return (
    <InPlaceEditingOff>
      <LinkWrapper link={linkTo} className={linkClassName}>
        <ImageTag
          content={root}
          attribute="siteLogoDark"
          className="navbar-brand-logo"
          alt={alternativeTextForObj(root.get('siteLogoDark'))}
        />
      </LinkWrapper>
    </InPlaceEditingOff>
  )
})

const LinkWrapper = connect(function LinkWrapper({
  children,
  link,
  className,
}: {
  children: React.ReactNode
  link: Obj | Link | null
  className?: string
}) {
  if (!link) return <div className={className}>{children}</div>

  return (
    <LinkTag to={link} className={className}>
      {children}
    </LinkTag>
  )
})
