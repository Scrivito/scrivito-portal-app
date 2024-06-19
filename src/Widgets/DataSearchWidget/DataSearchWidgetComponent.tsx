import {
  currentPage,
  currentPageParams,
  navigateTo,
  provideComponent,
} from 'scrivito'
import { DataSearchWidget } from './DataSearchWidgetClass'
import { useContext, useEffect, useRef } from 'react'
import { DataBatchContext } from '../../Components/DataBatchContext'
import { ensureString } from '../../utils/ensureString'

provideComponent(DataSearchWidget, ({ widget }) => {
  const { setSearch } = useContext(DataBatchContext)

  const buttonColor = widget.get('buttonColor') || 'btn-primary'
  const placeholder = widget.get('placeholder')
  const urlParamName = widget.get('urlParamName') || 'search'
  const inputRef = useRef<HTMLInputElement>(null)
  const search = ensureString(currentPageParams()[urlParamName]) || undefined

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

    if (!inputRef.current) return

    const value = inputRef.current.value
    const params = currentPageParams()
    delete params[urlParamName]
    if (value) params[urlParamName] = value
    navigateTo(currentPage(), { params })
  }
})
