import { useEffect, useState } from 'react'
import { DataBinary, dataBinaryToUrl } from '../utils/dataBinaryToUrl'

export function DataBinaryImage({
  dataBinary,
  alt,
  className,
}: {
  dataBinary: DataBinary
  alt?: string
  className?: string
}) {
  const [src, setSrc] = useState<string | undefined>(undefined)
  useEffect(() => {
    dataBinaryToUrl(dataBinary).then(({ url }) => setSrc(url))
  }, [dataBinary]) // TODO: Find out, why "eslint-plugin-react-hooks" does not detect this!

  if (!src) return null
  return <img src={src} alt={alt} className={className} />
}
