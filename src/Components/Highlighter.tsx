import { findAll } from 'highlight-words-core'
import { Fragment } from 'react'

/** This is a much slimmer implementation of the `react-highlight-words` package. */
export function Highlighter({
  autoEscape,
  highlightTag,
  outerTag,
  searchWords,
  textToHighlight,
}: {
  autoEscape?: boolean
  highlightTag?: React.ElementType
  outerTag?: React.ElementType
  searchWords: string[]
  textToHighlight: string
}): JSX.Element {
  const HighlightTag = highlightTag || 'mark'
  const OuterTag = outerTag || 'span'

  return (
    <OuterTag>
      {findAll({ autoEscape, searchWords, textToHighlight }).map(
        (chunk, index) => {
          const InnerTag = chunk.highlight ? HighlightTag : Fragment

          return (
            <InnerTag key={`${chunk.start}-${chunk.end}-${index}`}>
              {textToHighlight.substring(chunk.start, chunk.end)}
            </InnerTag>
          )
        },
      )}
    </OuterTag>
  )
}
