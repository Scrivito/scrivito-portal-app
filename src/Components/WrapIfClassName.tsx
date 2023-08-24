import { ReactNode } from 'react'

export function WrapIfClassName({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}): JSX.Element {
  return className ? (
    <div className={className}>{children}</div>
  ) : (
    <>{children}</>
  )
}
