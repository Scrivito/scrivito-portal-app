import { ComponentProps, useEffect, useState } from 'react'
import { DataBinary, dataBinaryToUrl } from '../utils/dataBinaryToUrl'
import { RetryingImage } from './RetryingImage'

export function DataBinaryImage({
  dataBinary,
  alt,
  ...props
}: ComponentProps<'img'> & { dataBinary: DataBinary }) {
  const [src, setSrc] = useState<string | undefined>(undefined)
  useEffect(() => {
    dataBinaryToUrl(dataBinary).then(({ url }) => setSrc(url))
  }, [dataBinary])

  if (!src) return null
  return <RetryingImage src={src} alt={alt ?? ''} {...props} />
}
