import React from 'react'
import { Widget } from 'scrivito'
import { textStyleAttributes } from './textStyleAttributes'

export function applyTextStyle(
  widget: Widget<typeof textStyleAttributes>,
  emptyValue?: {
    fontSize?: string
    letterSpacing?: string
    lineHeight?: string
    textTransform?: string
  },
): React.CSSProperties {
  const fontSize = widget.get('fontSize') || emptyValue?.fontSize
  const letterSpacing = widget.get('letterSpacing') || emptyValue?.letterSpacing
  const lineHeight = widget.get('lineHeight') || emptyValue?.lineHeight
  const textTransform = widget.get('textTransform') || emptyValue?.textTransform

  const style: React.CSSProperties = {}
  if (fontSize) style.fontSize = fontSize
  if (letterSpacing) style.letterSpacing = letterSpacing
  if (lineHeight) style.lineHeight = lineHeight
  if (textTransform) style.textTransform = textTransform

  return style
}
