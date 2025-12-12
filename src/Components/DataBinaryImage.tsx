import { CSSProperties, useEffect, useState, useRef } from 'react'
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
  const cleanupRef = useRef<(() => void) | undefined>(undefined)
  useEffect(() => {
    dataBinaryToUrl(dataBinary).then(({ url, cleanup }) => {
      cleanupRef.current?.()
      cleanupRef.current = cleanup
      setSrc(url)
    })

    return () => {
      cleanupRef.current?.()
    }
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
