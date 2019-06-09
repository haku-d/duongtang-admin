import React, { Component } from 'react'
import PropTypes from 'prop-types'

// function ModalBody( props )
class ModalBody extends Component {
  render() {
    return <div className={this.props.addClass}>{this.props.children}</div>
  }
}
// Validator values props
ModalBody.propTypes = {
  addClass: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}
// Default propTypes
ModalBody.defaultProps = {
  addClass: 'modal-body'
}
export default ModalBody
