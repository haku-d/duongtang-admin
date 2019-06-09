import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const modalRoot = document.getElementById('modal-root')

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

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
    return ReactDOM.createPortal(
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
      </React.Fragment>,
      this.el
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
