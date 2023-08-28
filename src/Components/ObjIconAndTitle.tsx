import { Obj, connect } from 'scrivito'
import { objTitle } from '../utils/objTitle'

export const ObjIconAndTitle = connect(function ObjIconAndTitle({
  obj,
}: {
  obj: Obj
}) {
  const linkIcon = obj.get('linkIcon')
  const showLinkIcon = typeof linkIcon === 'string' && !!linkIcon

  return (
    <>
      {showLinkIcon && (
        <>
          <i className={`bi ${linkIcon}`}></i>
        </>
      )}
      {objTitle(obj)}
    </>
  )
})
