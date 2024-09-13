import * as React from 'react'

interface IconSearchProps {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  searchValue: string
}
interface ClearSearchButtonProps {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  searchValue: string
}

export const IconSearch: React.FC<IconSearchProps> = ({
  setSearchValue,
  searchValue,
}) => {
  return (
    <div id="neoletter-icon-search">
      <label htmlFor="search-input">
        <i className="bs-icon bi-search" aria-hidden="true" />
        <span className="sr-only">Search icons</span>
      </label>
      <input
        id="search-input"
        className="form-control"
        placeholder="Search icons"
        autoComplete="off"
        spellCheck="false"
        autoCorrect="off"
        tabIndex={1}
        value={searchValue}
        onChange={(event) => {
          event.preventDefault()
          event.stopPropagation()

          setSearchValue(event.target.value)
        }}
      />
      <ClearSearchButton
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
    </div>
  )
}

const ClearSearchButton: React.FC<ClearSearchButtonProps> = ({
  setSearchValue,
  searchValue,
}) => {
  if (!searchValue.length) return null

  return (
    <button
      id="search-clear"
      className="bs-icon bi-x-circle"
      aria-hidden="true"
      onClick={() => setSearchValue('')}
    >
      <span className="sr-only">Clear search</span>
    </button>
  )
}
