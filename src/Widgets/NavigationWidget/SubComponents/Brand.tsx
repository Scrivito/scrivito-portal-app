import { connect, Obj, InPlaceEditingOff, LinkTag, ImageTag } from 'scrivito'

export const Brand = connect(function Brand({ root }: { root: Obj }) {
  return (
    <InPlaceEditingOff>
      <LinkTag to={root} className="navbar-brand">
        <ImageTag
          content={root}
          attribute="siteLogoDark"
          className="navbar-brand-logo"
        />
      </LinkTag>
    </InPlaceEditingOff>
  )
})
