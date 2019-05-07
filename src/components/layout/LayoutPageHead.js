import React, { Component } from 'react'
import PropTypes from 'prop-types'

// function PageHead( props )
class LayoutPageHead extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={this.props.addClass}>
          <h1 className="green page-header-title">{this.props.title}</h1>
          {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}
// Validator values props
LayoutPageHead.propTypes = {
  addClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}
// Default propTypes
LayoutPageHead.defaultProps = {
  addClass: 'page-header',
  title: '',
  children: <React.Fragment />
}
export default LayoutPageHead
