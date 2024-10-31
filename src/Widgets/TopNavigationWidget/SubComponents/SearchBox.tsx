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
      <div className="input-group ">
        <input
          className="form-control"
          type="search"
          placeholder={localizeSearchInputLabel()}
          aria-label={localizeSearchInputLabel()}
          ref={inputRef}
        />

        <button
          type="submit"
          className="btn btn-primary"
          aria-label={localizeSearchInputLabel()}
        >
          <i className="bi bi-search" aria-hidden="true"></i>
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
