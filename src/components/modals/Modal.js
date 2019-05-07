import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ModalHead from 'components/modals/ModalHead'
import ModalBody from 'components/modals/ModalBody'
import ModalFooter from 'components/modals/ModalFooter'

// function handleShow() {
//   let node = document.createElement('div')
//   node.className = 'fade modal-backdrop show'
//   document.getElementsByTagName('body')[0].appendChild(node)
// }

// function handleHide(pr, e) {
//   // console.log(e.target)
//   // console.log(pr)
//   let i = 0
//   let targetModal = e.target
//   while (targetModal.getAttribute('data-modal') !== pr) {
//     i++
//     targetModal = targetModal.parentElement
//     if (i > 100) {
//       return
//     }
//   }
//   targetModal.className = 'modal fade'
//   document.getElementsByClassName('modal-backdrop')[0].remove()
// }

class Modals extends Component {
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
Modals.propTypes = {
  children: PropTypes.element.isRequired,
  targetState: PropTypes.string.isRequired,
  modalSize: PropTypes.string.isRequired
}
// Default Value Props
Modals.defaultProps = {
  children: <React.Fragment />,
  targetState: '',
  modalSize: 'modal-dialog'
}
// handele Function
// handleShow.bind(this, 'jsTaget02')
// jsTaget02 -> name, id target show hide modal

export default Modals
export { Modals, ModalHead, ModalBody, ModalFooter }
