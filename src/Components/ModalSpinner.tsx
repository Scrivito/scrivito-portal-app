import { useEffect, useRef } from 'react'
import { connect } from 'scrivito'

export const ModalSpinner = connect(function ModalSpinner() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => dialogRef.current?.showModal(), [])

  return (
    <dialog
      className="loader-dialog"
      ref={dialogRef}
      onKeyDown={(e) => {
        if (e.key === 'Escape') e.preventDefault()
      }}
    >
      <div className="loader" />
    </dialog>
  )
})
