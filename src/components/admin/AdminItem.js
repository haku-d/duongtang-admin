import React, { Component } from 'react'
import PropTypes from 'prop-types'
// function AdminItem( props )
class AdminItem extends Component {
  idTarget(pr) {
    if (pr !== '') {
      return (
        <button
          className="btn btn-light btn-sm"
          data-target={this.props.idtarget}
        >
          Embed Video
        </button>
      )
    }
  }

  editTarget(pr) {
    if (pr !== '') {
      return <button className="btn btn-light btn-sm">Edit</button>
    }
  }

  views(pr) {
    if (pr !== '') {
      return (
        <label className="badge badge-success">
          {this.props.view} views
          {/*12 views*/}
        </label>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="list-group-item row">
          <div className="list-group-item-text col-sm-9">
            {this.props.url}
            {this.props.email}
          </div>
          <div className="list-group-item-right col-sm-3">
            {this.views(this.props.view)}
            {this.idTarget(this.props.idtarget)}
            {this.editTarget(this.props.edittarget)}
          </div>
        </div>
      </React.Fragment>
    )
  }
}
// Validator values props
AdminItem.propTypes = {
  url: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  view: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  idtarget: PropTypes.string.isRequired,
  edittarget: PropTypes.string.isRequired
}
// Default propTypes
AdminItem.defaultProps = {
  url: '',
  email: '',
  view: 0,
  idtarget: '',
  edittarget: ''
}
export default AdminItem
