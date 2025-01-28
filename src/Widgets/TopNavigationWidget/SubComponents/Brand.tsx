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
  linkTo: Obj | Link
  root: HomepageInstance
  linkClassName?: string
}) {
  return (
    <InPlaceEditingOff>
      <LinkTag to={linkTo} className={linkClassName}>
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
