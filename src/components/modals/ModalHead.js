import React, { Component } from 'react'
import PropTypes from 'prop-types'

// function ModalHead( props )
class ModalHead extends Component {
  // handleHide(e) {
  // let i = 0
  // let targetModal = e.target
  // while (targetModal.className.indexOf('show') === -1) {
  //   i++
  //   targetModal = targetModal.parentElement
  //   if (i > 100) {
  //     return
  //   }
  // }
  // this.props.closeModal()
  // targetModal.className = 'modal fade'
  // document.getElementsByClassName('modal-backdrop')[0].remove()
  // }
  checkClose() {
    if (this.props.hideBtnClose) {
      return ''
    }
    return (
      <button
        className="close"
        onClick={this.props.closeModal}
        data-modal={this.props.targetState}
      >
        ×
      </button>
    )
  }
  render() {
    return (
      <div className={this.props.addClass}>
        {this.props.children}
        {this.checkClose()}
      </div>
    )
  }
}
// Validator values props
ModalHead.propTypes = {
  addClass: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  hideBtnClose: PropTypes.bool.isRequired
}
// Default propTypes
ModalHead.defaultProps = {
  addClass: 'modal-header',
  children: <React.Fragment />,
  hideBtnClose: false
}

// Options
// addClass :
// "modal-header"
// getDefaultState = () => ({
//   modalVideo: false
// })
// closeModal={this.closeModal.bind(this, 'modalVideo')}
// targetState={'modalVideo'}
export default ModalHead
