import { Obj, connect } from 'scrivito'
import { objTitle } from '../utils/objTitle'
import { ensureString } from '../utils/ensureString'

export const ObjIconAndTitle = connect(function ObjIconAndTitle({
  obj,
}: {
  obj: Obj
}) {
  const linkIcon = ensureString(obj.get('linkIcon'))

  return (
    <>
      {linkIcon ? <i className={`bi ${linkIcon}`}></i> : null}
      {objTitle(obj)}
    </>
  )
})
