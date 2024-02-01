import { connect, navigateTo, Obj } from 'scrivito'
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
          placeholder="Search"
          aria-label="Search"
          ref={inputRef}
        />

        <button type="submit" className="btn btn-primary">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  )
})
