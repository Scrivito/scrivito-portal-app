import { connect, isInPlaceEditingActive } from 'scrivito'
import { placeholderCss } from '../utils/placeholderCss'

export const InPlaceEditingPlaceholder = connect(
  ({
    children,
    center,
    block,
  }: {
    children: string
    center?: boolean
    block?: boolean
  }) => {
    if (!isInPlaceEditingActive()) return null

    const innerSpan = <span style={placeholderCss}>{children}</span>

    if (center) return <div className="text-center">{innerSpan}</div>

    if (block) return <div>{innerSpan}</div>

    return innerSpan
  },
)
