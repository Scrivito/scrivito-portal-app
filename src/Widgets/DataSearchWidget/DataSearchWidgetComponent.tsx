import { currentPageParams, provideComponent, useData } from 'scrivito'
import { DataSearchWidget } from './DataSearchWidgetClass'
import { useContext, useEffect, useRef } from 'react'
import { DataBatchContext } from '../../Components/DataBatchContext'
import { getHistory } from '../../config/history'
import { ensureString } from '../../utils/ensureString'

provideComponent(DataSearchWidget, ({ widget }) => {
  const { setSearch } = useContext(DataBatchContext)

  const buttonColor = widget.get('buttonColor') || 'btn-primary'
  const placeholder = widget.get('placeholder')
  const inputRef = useRef<HTMLInputElement>(null)
  const paramName = useData().dataClassName() || 'search'
  const search = ensureString(currentPageParams()[paramName]) || undefined

  useEffect(() => setSearch(search), [setSearch, search])

  return (
    <form className="input-group mb-3" role="search" onSubmit={onSubmit}>
      <input
        key={search}
        className="form-control"
        placeholder={placeholder}
        ref={inputRef}
        defaultValue={search}
      />
      <span className="input-group-btn">
        <button className={`btn ${buttonColor}`} type="submit">
          <i className="bi bi-search" aria-hidden="true" />
        </button>
      </span>
    </form>
  )

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()

    const history = getHistory()
    if (!inputRef.current || !history) return

    const value = inputRef.current.value
    const searchParams = new URLSearchParams(history.location.search)
    searchParams.delete(paramName)
    if (value) searchParams.set(paramName, value)
    history.push(`?${searchParams.toString()}`)
  }
})
