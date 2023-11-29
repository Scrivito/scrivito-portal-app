import {
  currentPageParams,
  ImageTag,
  InPlaceEditingOff,
  load,
  navigateTo,
  Obj,
  provideComponent,
} from 'scrivito'
import { useEffect, useRef, useState } from 'react'
import { ensureString } from '../../utils/ensureString'
import { SearchResult, SearchResultLoadingPlaceholder } from './SearchResult'
import { SearchResultsWidget } from './SearchResultsWidgetClass'
import { DATA_OBJ_CLASSES } from '../../Objs/dataObjClasses'

const BLACKLIST_OBJ_CLASSES = ['Image', 'Video', ...DATA_OBJ_CLASSES]

provideComponent(SearchResultsWidget, ({ widget }) => {
  const query = ensureString(currentPageParams().q).trim()

  const inputRef = useRef<HTMLInputElement>(null)
  const [{ maxItems, searchResults, totalCount }, setState] = useState<{
    maxItems: number
    searchResults: Array<Obj> | null
    totalCount: number | null
  }>({
    maxItems: 10,
    searchResults: null,
    totalCount: null,
  })

  useEffect(() => {
    const search = Obj.whereFullTextOf('*', 'matches', query)
      .andNot('_objClass', 'equals', BLACKLIST_OBJ_CLASSES)
      .and('_dataParam', 'equals', null) // Ignore data details pages
      .andNot('excludeFromSearch', 'equals', true)

    let ignoreResults = false

    load(() => [search.take(maxItems), search.count()] as const).then(
      ([searchResults, totalCount]) => {
        if (ignoreResults) return

        setState({ maxItems, searchResults, totalCount })
      },
    )

    return () => {
      ignoreResults = true
    }
  }, [query, maxItems])

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

              setState({ maxItems: 10, searchResults: null, totalCount: null })

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
              />
              <span className="input-group-btn">
                <button className="btn btn-primary" type="submit">
                  <i className="bi bi-search" aria-hidden="true"></i>
                  <span className="d-none d-sm-inline ps-1">Search again</span>
                </button>
              </span>
            </div>
          </form>

          <h1 className="h3 b-bottom text-center mt-3">
            {totalCountSummary(totalCount)}
          </h1>
        </div>
      </section>

      <section className="bg-white py-3">
        <div className="container">
          {searchResults ? (
            searchResults.map((searchResult) => (
              <SearchResult
                key={`search-result-${searchResult.id()}`}
                query={query}
                searchResult={searchResult}
              />
            ))
          ) : (
            <SearchResultLoadingPlaceholder />
          )}
          {totalCount !== null && totalCount > maxItems ? (
            <div className="text-center">
              <button
                className="btn btn-outline-secondary"
                onClick={(e) => {
                  e.preventDefault()

                  setState((prevState) => ({
                    ...prevState,
                    maxItems: prevState.maxItems + 10,
                  }))
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

function totalCountSummary(totalCount: number | null) {
  if (totalCount === null) return <div className="loading-placeholder" />
  if (totalCount === 0) return 'No search results'
  if (totalCount === 1) return '1 search result'

  return `${totalCount} search results`
}
