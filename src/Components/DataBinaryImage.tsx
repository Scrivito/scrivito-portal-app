import { CSSProperties, useEffect, useState } from 'react'
import { DataBinary, dataBinaryToUrl } from '../utils/dataBinaryToUrl'
import { RetryingImage } from './RetryingImage'

export function DataBinaryImage({
  dataBinary,
  alt,
  className,
  style,
}: {
  dataBinary: DataBinary
  alt?: string
  className?: string
  style?: CSSProperties
}) {
  const [src, setSrc] = useState<string | undefined>(undefined)
  useEffect(() => {
    dataBinaryToUrl(dataBinary).then(({ url }) => setSrc(url))
  }, [dataBinary])

  if (!src) return null
  return (
    <RetryingImage
      src={src}
      alt={alt ?? ''}
      className={className}
      style={style}
    />
  )
}
