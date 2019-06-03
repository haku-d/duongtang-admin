import React, { Component } from 'react'

class ModalHead extends Component {
  render() {
    return (
      <div className="modal-header">
        <button
          className="close"
          onClick={this.props.close}
        >
          ×
        </button>
      </div>
    )
  }
}

export default ModalHead
