import React from 'react'
import PropTypes from 'prop-types'

class LayoutMain extends React.Component {
  render() {
    return (
      <div className={this.props.addClass}>
        <div className="container">{this.props.children}</div>
      </div>
    )
  }
}
// Validator values props
LayoutMain.propTypes = {
  addClass: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}
// Default propTypes
LayoutMain.defaultProps = {
  addClass: 'main',
  children: <React.Fragment />
}
export default LayoutMain
