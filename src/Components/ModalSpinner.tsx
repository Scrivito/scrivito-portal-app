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
    <dialog className="loader-dailog" ref={dialogRef}>
      <div className="fade modal-backdrop show"></div>
      <div className="loader" />
    </dialog>
  )
})
