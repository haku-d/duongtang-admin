import React, { Component } from 'react'

class ModalFooter extends Component {
  render() {
    return <div className={'modal-footer'}>{this.props.children}</div>
  }
}

export default ModalFooter
