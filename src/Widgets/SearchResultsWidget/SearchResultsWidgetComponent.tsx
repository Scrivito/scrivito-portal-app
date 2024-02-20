import {
  currentPageParams,
  ImageTag,
  InPlaceEditingOff,
  navigateTo,
  Obj,
  provideComponent,
} from 'scrivito'
import { useRef, useState } from 'react'
import { ensureString } from '../../utils/ensureString'
import { SearchResult } from './SearchResult'
import { SearchResultsWidget } from './SearchResultsWidgetClass'
import { DATA_OBJ_CLASSES } from '../../Objs/dataObjClasses'

const BLACKLIST_OBJ_CLASSES = ['Image', 'Video', ...DATA_OBJ_CLASSES]

// TODO: Add "loading" state, once #7242 is available
provideComponent(SearchResultsWidget, ({ widget }) => {
  const query = ensureString(currentPageParams().q).trim()

  const inputRef = useRef<HTMLInputElement>(null)
  const [maxItems, setMaxItems] = useState<number>(10)

  const search = Obj.whereFullTextOf('*', 'matches', query)
    .andNot('_objClass', 'equals', BLACKLIST_OBJ_CLASSES)
    .and('_dataParam', 'equals', null) // Ignore data details pages
    .andNot('excludeFromSearch', 'equals', true)

  const searchResults = search.take(maxItems)
  const totalCount = search.count()

  return (
    <InPlaceEditingOff>
      <section className="bg-primary py-4">
        <ImageTag
          content={widget}
          attribute="topBannerBackground"
          className="img-background"
        />
        <div className="container">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setMaxItems(10)

              const q = ensureString(inputRef.current?.value)
              navigateTo(widget.obj(), { q })
            }}
          >
            <div className="input-group">
              <input
                className="form-control"
                placeholder="Search"
                defaultValue={query}
                ref={inputRef}
                key={`search-results-widget-input-${query}`}
              />
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="submit">
                  <i className="bi bi-search" aria-hidden="true"></i>
                  <span className="d-none d-sm-inline ps-1">Search again</span>
                </button>
              </span>
            </div>
          </form>

          <h1 className="h3 b-bottom text-center mt-3">
            <TotalCountSummary totalCount={totalCount} />
          </h1>
        </div>
      </section>

      <section className="bg-white py-3">
        <div className="container">
          {searchResults.map((searchResult) => (
            <SearchResult
              key={`search-result-${searchResult.id()}`}
              query={query}
              searchResult={searchResult}
            />
          ))}
          {totalCount > maxItems ? (
            <div className="text-center">
              <button
                className="btn btn-outline-primary"
                onClick={(e) => {
                  e.preventDefault()
                  setMaxItems((maxItems) => maxItems + 10)
                }}
              >
                Load more
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </InPlaceEditingOff>
  )
})

function TotalCountSummary({ totalCount }: { totalCount: number }) {
  if (totalCount === 0) return 'No search results'
  if (totalCount === 1) return '1 search result'

  return `${totalCount} search results`
}
