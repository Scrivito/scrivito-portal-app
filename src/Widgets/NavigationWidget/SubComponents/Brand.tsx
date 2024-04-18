import { connect, InPlaceEditingOff, LinkTag, ImageTag } from 'scrivito'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'

export const Brand = connect(function Brand({
  root,
}: {
  root: HomepageInstance
}) {
  return (
    <InPlaceEditingOff>
      <Link root={root} className="navbar-brand">
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
    const portalOverviewPage =
      root.get('sitePortalOverviewPage') ||
      root.get('sitePortalOverviewFallbackPage')
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
