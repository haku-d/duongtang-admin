import React from 'react'

import Modal from './Modal'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import ModalHead from './ModalHead'

export default class Confirm extends React.Component {
  state = {
    open: false,
    callback: null
  }

  show = callback => event => {
    event.preventDefault()

    event = {
      ...event,
      target: { ...event.target, value: event.target.value }
    }

    this.setState({
      open: true,
      callback: () => callback(event)
    })
  }

  hide = () => this.setState({ open: false, callback: null })

  confirm = () => {
    this.state.callback()
    this.hide()
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children(this.show)}
        <Modal modalSize={'modal-dialog modal-md'} modalShow={this.state.open}>
          <ModalHead close={this.hide}>
            <h5 className="modal-title">{this.props.title}</h5>
          </ModalHead>
          <ModalBody>
            <React.Fragment>{this.props.description}</React.Fragment>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-default"
              onClick={this.hide}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.confirm}
            >
              OK
            </button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}
