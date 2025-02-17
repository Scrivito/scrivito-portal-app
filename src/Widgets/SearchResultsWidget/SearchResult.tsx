import {
  connect,
  extractText,
  ImageTag,
  LinkTag,
  Obj,
  useResolvedStringValue,
} from 'scrivito'
import { truncate } from 'lodash-es'
import { ensureString } from '../../utils/ensureString'
import { Highlighter } from '../../Components/Highlighter'
import { objTitle } from '../../utils/objTitle'

export const SearchResult = connect(function SearchResult({
  query,
  searchResult,
  readMoreLabel,
}: {
  query: string
  searchResult: Obj
  readMoreLabel: string
}) {
  return (
    <div className="card bg-light-grey my-4">
      <LinkTag to={searchResult}>
        <div className="row g-0">
          {searchResult.get('image') ? (
            <>
              <div className="col-md-3">
                <ImageTag
                  content={searchResult}
                  attribute="image"
                  className="img-box"
                  alt=""
                />
              </div>
              <div className="col-md-9">
                <TextDescription
                  readMoreLabel={readMoreLabel}
                  searchResult={searchResult}
                  query={query}
                />
              </div>
            </>
          ) : (
            <div className="col">
              <TextDescription
                readMoreLabel={readMoreLabel}
                searchResult={searchResult}
                query={query}
              />
            </div>
          )}
        </div>
      </LinkTag>
    </div>
  )
})

const TextDescription = connect(function TextResult({
  searchResult,
  readMoreLabel,
  query,
}: {
  searchResult: Obj
  readMoreLabel: string
  query: string
}) {
  const searchWords = query.split(/\s+/)

  const description =
    ensureString(searchResult.get('metaDataDescription')) ||
    extractText(searchResult, { length: 300 })

  const shortDescription = truncate(useResolvedStringValue(description), {
    length: 200,
    separator: /,? +/,
  })

  return (
    <div className="card-body">
      <Highlighter
        outerTag="h3"
        searchWords={searchWords}
        textToHighlight={useResolvedStringValue(objTitle(searchResult))}
      />

      <Highlighter
        outerTag="p"
        searchWords={searchWords}
        textToHighlight={shortDescription}
      />

      <button className="btn btn-sm btn-outline-primary">
        {readMoreLabel}
        <i className="bi bi-chevron-right ps-2" aria-hidden="true"></i>
      </button>
    </div>
  )
})
