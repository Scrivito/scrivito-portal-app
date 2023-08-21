import * as React from 'react'
import { provideComponent } from 'scrivito'
import { FormButtonWidget } from './FormButtonWidgetClass'

interface WrapIfClassNameProps {
  className?: string
  children: React.ReactNode
}

provideComponent(FormButtonWidget, ({ widget }) => {
  const alignment = widget.get('alignment')
  const className =
    alignment && ['center', 'right'].includes(alignment)
      ? `text-${widget.get('alignment')}`
      : undefined

  return (
    <WrapIfClassName className={className}>
      <button
        className={`btn btn-primary${
          widget.get('alignment') === 'block' ? ' btn-block' : ''
        }`}
        type="submit"
      >
        {widget.get('buttonText')}
      </button>
    </WrapIfClassName>
  )
})

function WrapIfClassName({
  className,
  children,
}: WrapIfClassNameProps): JSX.Element {
  return className ? (
    <div className={className}>{children}</div>
  ) : (
    <>{children}</>
  )
}
