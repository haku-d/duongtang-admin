import React from 'react'
import { connect } from 'react-redux'
import BlockUi from 'react-block-ui'

import Form from 'components/ui/Form'
import Input from 'components/ui/Input'
import { changePassword } from 'reducers/AppReducer'
import Main from 'components/ui/Main'
import Header from 'components/ui/Header'

class ChangePasswordPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getDefaultState()
    this.handleNewPw = this.handleNewPw.bind(this)
    this.handleCurrentPw = this.handleCurrentPw.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  getDefaultState() {
    return {
      current_pw: '',
      new_pw: '',
      isError: false,
      isSuccess: false,
      msg: ''
    }
  }

  handleCurrentPw(e) {
    this.setState({
      current_pw: e.target.value
    })
  }

  handleNewPw(e) {
    this.setState({
      new_pw: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props
      .changePassword({
        current_pw: this.state.current_pw,
        new_pw: this.state.new_pw
      })
      .then(() => {
        this.setState({
          isSuccess: true,
          isError: false,
          msg: 'Your password has been updated!'
        })
      })
      .catch(err => {
        this.setState({
          isError: true,
          isSuccess: false,
          msg: err.toString()
        })
      })
  }

  render() {
    return (
      <Main>
        <Header title="Change password" />
        <div className="row">
          <div className="col-sm-6">
            <BlockUi blocking={this.props.ui.isLoading}>
              <Form
                isError={this.state.isError}
                isSuccess={this.state.isSuccess}
                msg={this.state.msg}
                onSubmit={this.handleSubmit}
              >
                <Input
                  id="current_pw"
                  type="password"
                  label="Old password"
                  placeholder="Old password"
                  onChange={this.handleCurrentPw}
                />
                <Input
                  id="new_pw"
                  type="password"
                  label="New password"
                  placeholder="New password"
                  onChange={this.handleNewPw}
                />
                <div className="form-group">
                  <button type="submit" className="btn btn-success">
                    Submit Change
                  </button>
                </div>
              </Form>
            </BlockUi>
          </div>
        </div>
      </Main>
    )
  }
}
const mapStateToProps = state => {
  return {
    ui: state.ui
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changePassword: input => dispatch(changePassword(input))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordPage)
