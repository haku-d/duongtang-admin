import React, { Component } from 'react'
import PropTypes from 'prop-types'

// function ModalFooter( props )
class ModalFooter extends Component {
  render() {
    return <div className={this.props.addClass}>{this.props.children}</div>
  }
}
// Validator values props
ModalFooter.propTypes = {
  addClass: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}
// Default propTypes
ModalFooter.defaultProps = {
  addClass: 'modal-footer',
  children: <React.Fragment />
}

// Options
// addClass :
// "modal-footer"

export default ModalFooter
