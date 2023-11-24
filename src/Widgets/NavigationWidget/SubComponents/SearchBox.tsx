import { connect, currentPage, navigateTo, Obj } from 'scrivito'
import { useRef } from 'react'

export const SearchBox = connect(function SearchBox({
  searchResultsPage,
}: {
  searchResultsPage: Obj | null
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  if (!searchResultsPage) return null
  const disabled = searchResultsPage.id() === currentPage()?.id()

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault()

        const q = inputRef.current?.value
        if (!q) return
        inputRef.current.value = ''

        navigateTo(searchResultsPage, { q })
      }}
    >
      <div className="input-group" style={{ height: '100%' }}>
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          ref={inputRef}
          disabled={disabled}
        />

        <button type="submit" className="btn btn-primary" disabled={disabled}>
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  )
})
