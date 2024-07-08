import { useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import { connect } from 'scrivito'

export const Submitting = connect(function Submitting() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => dialogRef.current?.showModal(), [])

  return (
    <>
      <dialog className="d-none" ref={dialogRef} />
      <Modal
        backdrop="static"
        centered
        dialogAs={() => <div className="loader" />}
        fullscreen
        keyboard={false}
        show
      />
    </>
  )
})
