import React from 'react'
import { connect } from 'react-redux'
import BlockUi from 'react-block-ui'
import { verifyEmail, logout } from 'reducers/UserReducer'

class VerifyPage extends React.Component {
  constructor(props) {
    super(props)
    this.props.logout()
    this.props.verifyEmail(this.props.location.search)
  }

  onSuccess() {
    if (this.props.ui.verifyEmail.isSuccess) {
      return (
        <div className="alert alert-success">
          {this.props.ui.verifyEmail.msg}
        </div>
      )
    }
  }

  onError() {
    if (this.props.ui.verifyEmail.isError) {
      return (
        <div className="alert alert-danger">
          {this.props.ui.verifyEmail.msg}
        </div>
      )
    }
  }

  render() {
    return (
      <BlockUi blocking={this.props.ui.verifyEmail.isLoading}>
        {this.onSuccess()}
        {this.onError()}
      </BlockUi>
    )
  }
}

export default connect(
  state => ({ ui: state.ui }),
  dispatch => ({
    verifyEmail: query => dispatch(verifyEmail(query)),
    logout: () => dispatch(logout())
  })
)(VerifyPage)
