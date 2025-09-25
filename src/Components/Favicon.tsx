import { connect, Obj, urlFor } from 'scrivito'

export const Favicon = connect(function Favicon() {
  const favicon = Obj.root()?.get('siteFavicon')

  if (!(favicon instanceof Obj)) return null
  if (!favicon.contentType().startsWith('image/')) return null

  return (
    <link
      rel="shortcut icon"
      type={favicon.contentType()}
      href={urlFor(favicon)}
    />
  )
})
