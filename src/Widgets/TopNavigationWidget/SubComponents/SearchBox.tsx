import { connect, currentLanguage, navigateTo, Obj } from 'scrivito'
import { useRef } from 'react'
import messages from './i18n.visitor.json'
import rosetta from 'rosetta'

const i18n = rosetta(messages)
const lang = currentLanguage() ?? 'en'
i18n.locale(lang in messages ? lang : 'en')

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
          placeholder={i18n.t('search')}
          aria-label={i18n.t('search')}
          ref={inputRef}
        />

        <button
          type="submit"
          className="btn btn-primary"
          aria-label={i18n.t('search')}
        >
          <i className="bi bi-search" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  )
})
