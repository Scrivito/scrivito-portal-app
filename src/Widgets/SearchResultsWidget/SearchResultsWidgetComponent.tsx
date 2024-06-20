import {
  connect,
  ContentTag,
  currentPageParams,
  ImageTag,
  InPlaceEditingOff,
  navigateTo,
  Obj,
  ObjSearch,
  provideComponent,
} from 'scrivito'
import { useRef, useState } from 'react'
import { ensureString } from '../../utils/ensureString'
import { SearchResult } from './SearchResult'
import {
  SearchResultsWidget,
  SearchResultsWidgetInstance,
} from './SearchResultsWidgetClass'
import { Loading } from '../../Components/Loading'

const BLACKLIST_OBJ_CLASSES = ['Image', 'Redirect', 'Video']

// TODO: Add "loading" state, once #7242 is available
provideComponent(SearchResultsWidget, ({ widget }) => {
  const query = ensureString(currentPageParams().q).trim()

  const inputRef = useRef<HTMLInputElement>(null)
  const [maxItems, setMaxItems] = useState<number>(10)

  const search = Obj.whereFullTextOf('*', 'matches', query)
    .andNot('_objClass', 'equals', BLACKLIST_OBJ_CLASSES)
    .and('_dataParam', 'equals', null) // Ignore data details pages
    .andNot('excludeFromSearch', 'equals', true)

  const readMoreLabel = widget.get('readMoreLabel')
  const searchButtonLabel = widget.get('searchButtonLabel')
  const searchInputPlaceholder = widget.get('searchInputPlaceholder')
  const showMoreResultsLabel = widget.get('showMoreResultsLabel')

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
                placeholder={searchInputPlaceholder}
                defaultValue={query}
                ref={inputRef}
                key={`search-results-widget-input-${query}`}
              />
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="submit">
                  <i className="bi bi-search" aria-hidden="true"></i>
                  <span className="d-none d-sm-inline ps-1">
                    {searchButtonLabel}
                  </span>
                </button>
              </span>
            </div>
          </form>

          <h1 className="h3 b-bottom text-center mt-3">
            <TotalCountSummary search={search} widget={widget} />
          </h1>
        </div>
      </section>

      <section className="bg-white py-3">
        <SearchResults
          search={search}
          query={query}
          maxItems={maxItems}
          setMaxItems={setMaxItems}
          readMoreLabel={readMoreLabel}
          showMoreResultsLabel={showMoreResultsLabel}
        />
      </section>
    </InPlaceEditingOff>
  )
})

const SearchResults = connect(
  function SearchResults({
    search,
    query,
    maxItems,
    setMaxItems,
    readMoreLabel,
    showMoreResultsLabel,
  }: {
    search: ObjSearch
    query: string
    maxItems: number
    setMaxItems: React.Dispatch<React.SetStateAction<number>>
    readMoreLabel: string
    showMoreResultsLabel: string
  }) {
    const searchResults = search.take(maxItems)

    return (
      <div className="container">
        {searchResults.map((searchResult) => (
          <SearchResult
            key={`search-result-${searchResult.id()}`}
            query={query}
            readMoreLabel={readMoreLabel}
            searchResult={searchResult}
          />
        ))}
        {search.count() > maxItems ? (
          <div className="text-center">
            <button
              className="btn btn-outline-primary"
              onClick={(e) => {
                e.preventDefault()
                setMaxItems((maxItems) => maxItems + 10)
              }}
            >
              {showMoreResultsLabel}
            </button>
          </div>
        ) : null}
      </div>
    )
  },
  {
    loading: () => (
      <div className="container text-center">
        <Loading />
      </div>
    ),
  },
)

const TotalCountSummary = connect(
  function TotalCountSummary({
    search,
    widget,
  }: {
    search: ObjSearch
    widget: SearchResultsWidgetInstance
  }) {
    const totalCount = search.count()
    const attributes = ['resultsHeadline0', 'resultsHeadline1'] as const
    const attribute = attributes[totalCount] || 'resultsHeadline'

    return (
      <ContentTag
        content={widget}
        attribute={attribute}
        dataContext={{ count: totalCount.toString() }}
      />
    )
  },
  {
    loading: ({ widget }: { widget: SearchResultsWidgetInstance }) => (
      <ContentTag content={widget} attribute="resultsLoadingHeadline" />
    ),
  },
)
