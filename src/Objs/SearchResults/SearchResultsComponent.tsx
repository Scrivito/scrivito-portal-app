import {
  currentPage,
  ImageTag,
  InPlaceEditingOff,
  load,
  navigateTo,
  Obj,
  provideComponent,
} from 'scrivito'
import { useEffect, useRef, useState } from 'react'
import { DATA_OBJ_CLASSES } from '../../config/scrivitoContentBrowser'
import { ensureString } from '../../utils/ensureString'
import { SearchResult, SearchResultLoadingPlaceholder } from './SearchResult'
import { SearchResults } from './SearchResultsObjClass'

const BLACKLIST_OBJ_CLASSES = [
  'Image',
  'SearchResults',
  'Video',
  ...DATA_OBJ_CLASSES,
]

provideComponent(SearchResults, ({ page, params }) => {
  const query = ensureString(params?.q).trim()

  const inputRef = useRef<HTMLInputElement>(null)
  const [{ maxItems, searchResults, totalCount, updateCounter }, setState] =
    useState<{
      maxItems: number
      searchResults: Array<Obj> | null
      totalCount: number | null
      updateCounter: number
    }>({
      maxItems: 10,
      searchResults: null,
      totalCount: null,
      updateCounter: 0,
    })

  useEffect(() => {
    const search = Obj.whereFullTextOf('*', 'matches', query)
      .andNot('_objClass', 'equals', BLACKLIST_OBJ_CLASSES)
      .and('_dataParam', 'equals', null) // Ignore data details pages

    load(() => [search.take(maxItems), search.count()] as const).then(
      ([searchResults, totalCount]) => {
        setState((prevState) => {
          if (prevState.updateCounter !== updateCounter) return prevState

          return {
            ...prevState,
            searchResults,
            totalCount,
            updateCounter: prevState.updateCounter + 1,
          }
        })
      },
    )
  }, [query, maxItems, updateCounter])

  return (
    <InPlaceEditingOff>
      <section className="bg-primary py-4">
        <ImageTag
          content={page}
          attribute="topBannerBackground"
          className="img-background"
        />
        <div className="container">
          <form
            onSubmit={(e) => {
              e.preventDefault()

              setState((previousState) => ({
                maxItems: 10,
                searchResults: null,
                totalCount: null,
                updateCounter: previousState.updateCounter + 1,
              }))

              const q = ensureString(inputRef.current?.value)
              navigateTo(currentPage(), { q })
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
