import { Modal } from 'react-bootstrap'
import { connect } from 'scrivito'

export const Submitting = connect(function Submitting() {
  return (
    <Modal
      backdrop="static"
      centered
      dialogAs={() => <div className="loader" />}
      fullscreen
      show
    />
  )
})
