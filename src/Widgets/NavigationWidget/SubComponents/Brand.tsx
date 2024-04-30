import { connect, InPlaceEditingOff, LinkTag, ImageTag } from 'scrivito'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'
import { getSitePortalOverviewPage } from '../../../utils/getSitePortalOverviewPage'

export const Brand = connect(function Brand({
  root,
  linkClassName,
}: {
  root: HomepageInstance
  linkClassName?: string
}) {
  return (
    <InPlaceEditingOff>
      <Link root={root} className={linkClassName}>
        <ImageTag
          content={root}
          attribute="siteLogoDark"
          className="navbar-brand-logo"
        />
      </Link>
    </InPlaceEditingOff>
  )
})

const Link = connect(function Link({
  root,
  children,
  className,
}: {
  root: HomepageInstance
  children: React.ReactNode
  className?: string
}) {
  if (root.get('sitePortalOnlyMode')) {
    const portalOverviewPage = getSitePortalOverviewPage(root)

    if (!portalOverviewPage) {
      return <span className={className}>{children}</span>
    }

    return (
      <LinkTag to={portalOverviewPage} className={className}>
        {children}
      </LinkTag>
    )
  }

  return (
    <LinkTag to={root} className={className}>
      {children}
    </LinkTag>
  )
})
