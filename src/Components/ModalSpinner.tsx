import { useEffect, useRef } from 'react'
import { connect } from 'scrivito'

export const ModalSpinner = connect(function ModalSpinner() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    dialogRef.current?.showModal()
    dialogRef.current?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') e.preventDefault()
    })
  }, [])

  return (
    <dialog className="loader-dialog" ref={dialogRef}>
      <div className="loader" />
    </dialog>
  )
})
