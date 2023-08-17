import { Obj } from 'scrivito'

export function objTitle(obj: Obj) {
  const title = obj.get('title')

  return typeof title === 'string' && title ? title : '<untitled>'
}

export function objIconAndTitle(obj: Obj) {
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
}
