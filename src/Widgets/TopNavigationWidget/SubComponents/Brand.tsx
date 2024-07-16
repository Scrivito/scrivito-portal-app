import { connect, InPlaceEditingOff, LinkTag, ImageTag } from 'scrivito'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'
import { alternativeTextForObj } from '../../../utils/alternativeTextForObj'

export const Brand = connect(function Brand({
  root,
  linkClassName,
}: {
  root: HomepageInstance
  linkClassName?: string
}) {
  return (
    <InPlaceEditingOff>
      <LinkTag to={root} className={linkClassName}>
        <ImageTag
          content={root}
          attribute="siteLogoDark"
          className="navbar-brand-logo"
          alt={alternativeTextForObj(root.get('siteLogoDark'))}
        />
      </LinkTag>
    </InPlaceEditingOff>
  )
})
