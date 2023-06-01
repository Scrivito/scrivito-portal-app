import * as Scrivito from 'scrivito'

export function objTitle(obj: Scrivito.Obj) {
  const title = obj.get('title')

  return typeof title === 'string' && title ? title : '<untitled>'
}

export function objIconAndTitle(obj: Scrivito.Obj) {
  const linkIcon = obj.get('linkIcon')
  const showLinkIcon = typeof linkIcon === 'string'

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
