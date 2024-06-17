import { provideComponent } from 'scrivito'
import { DataSearchWidget } from './DataSearchWidgetClass'
import { useContext, useRef } from 'react'
import { DataBatchContext } from '../../Components/DataBatchContext'

provideComponent(DataSearchWidget, ({ widget }) => {
  const { setSearch } = useContext(DataBatchContext)

  const buttonColor = widget.get('buttonColor') || 'btn-primary'
  const placeholder = widget.get('placeholder')
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form
      className="input-group mb-3"
      role="search"
      onSubmit={(event) => {
        event.preventDefault()
        if (!inputRef.current) return
        setSearch(inputRef.current.value || undefined)
        inputRef.current.blur()
      }}
    >
      <input
        className="form-control"
        placeholder={placeholder}
        ref={inputRef}
      />
      <span className="input-group-btn">
        <button className={`btn ${buttonColor}`} type="submit">
          <i className="bi bi-search" aria-hidden="true" />
        </button>
      </span>
    </form>
  )
})
