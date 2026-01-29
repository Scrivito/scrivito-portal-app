import React from 'react'
import { Widget } from 'scrivito'
import { paddingAttributes } from './paddingAttributes'

export function applyPadding(
  widget: Widget<typeof paddingAttributes>,
  emptyValue?: {
    paddingTop?: string
    paddingLeft?: string
    paddingRight?: string
    paddingBottom?: string
  },
): React.CSSProperties {
  const paddingTop = widget.get('paddingTop') || emptyValue?.paddingTop
  const paddingLeft = widget.get('paddingLeft') || emptyValue?.paddingLeft
  const paddingRight = widget.get('paddingRight') || emptyValue?.paddingRight
  const paddingBottom = widget.get('paddingBottom') || emptyValue?.paddingBottom

  const style: React.CSSProperties = {}
  if (paddingTop) style.paddingTop = paddingTop
  if (paddingLeft) style.paddingLeft = paddingLeft
  if (paddingRight) style.paddingRight = paddingRight
  if (paddingBottom) style.paddingBottom = paddingBottom

  return style
}
