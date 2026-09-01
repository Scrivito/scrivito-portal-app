import { connect, currentLanguage, navigateTo, Obj } from 'scrivito'
import { useRef } from 'react'

export const SearchBox = connect(function SearchBox({
  searchResultsPage,
}: {
  searchResultsPage: Obj | null
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  if (!searchResultsPage) return null

  return (
    <form
      className="max-lg:w-full"
      role="search"
      onSubmit={(event) => {
        event.preventDefault()
        if (!inputRef.current) return

        const q = inputRef.current.value
        inputRef.current.value = ''
        inputRef.current.blur()

        navigateTo(searchResultsPage, { q })
      }}
    >
      <div className="input-group mt-1 flex w-full">
        <input
          className="form-control rounded-l-portal bg-portal-light-grey h-[38px] w-[1%] min-w-0 flex-1 border border-r-0 border-[rgba(0,0,0,0.2)] px-3 py-1.5 text-[0.8rem] placeholder:text-[rgba(33,37,41,0.75)]"
          type="search"
          placeholder={localizeSearchInputLabel()}
          aria-label={localizeSearchInputLabel()}
          ref={inputRef}
        />

        <button
          type="submit"
          className="btn btn-primary rounded-r-portal border-portal-primary bg-portal-primary text-on-portal-primary -ml-px flex h-[38px] border px-3 py-1.5 text-base"
          aria-label={localizeSearchInputLabel()}
        >
          <i className="bi bi-search m-auto p-0" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  )
})

function localizeSearchInputLabel(): string {
  switch (currentLanguage()) {
    case 'de':
      return 'Suche'
    case 'fr':
      return 'Recherche'
    case 'pl':
      return 'Szukaj'
    default:
      return 'Search'
  }
}
