import React from 'react'

class Header extends React.Component {
  render() {
    return (
      <div className="page-header">
        <h1 className="green page-header-title">{this.props.title}</h1>
        {this.props.children}
      </div>
    )
  }
}

export default Header
