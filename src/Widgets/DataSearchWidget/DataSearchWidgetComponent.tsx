import {
  currentPage,
  currentPageParams,
  navigateTo,
  provideComponent,
} from 'scrivito'
import {
  DEFAULT_URL_PARAM_NAME,
  DataSearchWidget,
} from './DataSearchWidgetClass'
import { useContext, useEffect, useRef } from 'react'
import { DataBatchContext } from '../../Components/DataBatchContext'
import { ensureString } from '../../utils/ensureString'
import { EditorNote } from '../../Components/EditorNote'

provideComponent(DataSearchWidget, ({ widget }) => {
  const { setSearch } = useContext(DataBatchContext)

  if (!setSearch) {
    return (
      <EditorNote>
        This input is hidden because neither the page or a containing widget
        support data search.
      </EditorNote>
    )
  }

  const buttonColor = widget.get('buttonColor') || 'btn-primary'
  const buttonLabel = widget.get('buttonLabel')
  const placeholder = widget.get('placeholder')
  const buttonAriaLabel = buttonLabel || placeholder
  const urlParamName = widget.get('urlParamName') || DEFAULT_URL_PARAM_NAME
  const inputRef = useRef<HTMLInputElement>(null)
  const search = ensureString(currentPageParams()[urlParamName])

  useEffect(() => setSearch(search), [setSearch, search])

  return (
    <form
      className={`input-group ${widget.get('margin') ?? 'mb-3'}`}
      role="search"
      onSubmit={onSubmit}
    >
      <input
        key={search}
        className="form-control"
        placeholder={placeholder}
        ref={inputRef}
        defaultValue={search}
      />
      <span className="input-group-btn">
        <button
          className={`btn ${buttonColor}`}
          type="submit"
          aria-label={buttonAriaLabel}
        >
          <i className="bi bi-search" aria-hidden="true" />
          <span className="d-none d-sm-inline ps-1">{buttonLabel}</span>
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
