import * as React from 'react'
import { provideComponent } from 'scrivito'
import { FormButtonWidget } from './FormButtonWidgetClass'

interface WrapIfClassNameProps {
  className?: string
  children: React.ReactNode
}
import { alignmentClassName } from '../FormContainerWidget/utils/alignmentClassName'

provideComponent(FormButtonWidget, ({ widget }) => {
  const alignment = widget.get('alignment')
  const className = alignmentClassName(alignment)

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
