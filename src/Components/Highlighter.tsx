import { findAll } from 'highlight-words-core'
import { Fragment } from 'react'

/** This is a much slimmer implementation of the `react-highlight-words` package. */
export function Highlighter({
  outerTag,
  searchWords,
  textToHighlight,
}: {
  outerTag?: React.ElementType
  searchWords: string[]
  textToHighlight: string
}): JSX.Element {
  const OuterTag = outerTag || 'span'

  return (
    <OuterTag>
      {findAll({ searchWords, textToHighlight, autoEscape: true }).map(
        (chunk, index) => {
          const InnerTag = chunk.highlight ? 'mark' : Fragment

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
