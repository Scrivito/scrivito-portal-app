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
}: {
  query: string
  searchResult: Obj
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
                />
              </div>
              <div className="col-md-9">
                <TextDescription searchResult={searchResult} query={query} />
              </div>
            </>
          ) : (
            <div className="col">
              <TextDescription searchResult={searchResult} query={query} />
            </div>
          )}
        </div>
      </LinkTag>
    </div>
  )
})

const TextDescription = connect(function TextResult({
  searchResult,
  query,
}: {
  searchResult: Obj
  query: string
}) {
  const searchWords = query.split(/\s+/)

  const description =
    extractText(searchResult, { length: 300 }) ||
    ensureString(searchResult.get('metaDataDescription'))

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
        Read more
        <i className="bi bi-chevron-right ps-2" aria-hidden="true"></i>
      </button>
    </div>
  )
})
