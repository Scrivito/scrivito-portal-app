import { type ComponentProps, useState } from 'react'

export function RetryingImage({ alt, ...props }: ComponentProps<'img'>) {
  const [retryDelayMs, setRetryDelayMs] = useState(1000)
  function onError() {
    setTimeout(() => setRetryDelayMs(retryDelayMs * 2), retryDelayMs)
  }
  const key = retryDelayMs
  return <img key={key} alt={alt} {...props} onError={onError} />
}
