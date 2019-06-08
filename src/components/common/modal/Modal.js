import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ModalHead from './ModalHead'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'

class Modal extends Component {
  displayBackdrop() {
    if (this.props.modalShow) {
      return <div className={'fade modal-backdrop show'} />
    }
    return ''
  }

  handleModalToggle() {
    let modalClassName = 'modal fade'
    if (this.props.modalShow) {
      modalClassName = 'modal fade show'
    }
    return modalClassName
  }

  render() {
    return (
      <React.Fragment>
        <div
          className={this.handleModalToggle()}
          onClick={this.props.closeModal}
          data-modal={this.props.targetState}
        >
          <div className={this.props.modalSize}>
            <div className="modal-content">{this.props.children}</div>
          </div>
        </div>
        {this.displayBackdrop()}
      </React.Fragment>
    )
  }
}
// Validator Value Props
Modal.propTypes = {
  // children: PropTypes.element.isRequired,
  targetState: PropTypes.string.isRequired,
  modalSize: PropTypes.string.isRequired
}
// Default Value Props
Modal.defaultProps = {
  targetState: '',
  modalSize: 'modal-dialog'
}
// handele Function
// handleShow.bind(this, 'jsTaget02')
// jsTaget02 -> name, id target show hide modal

export default Modal
export { Modal, ModalHead, ModalBody, ModalFooter }
