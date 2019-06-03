import React from 'react'
import { connect } from 'react-redux'
import BlockUi from 'react-block-ui'
import { login } from 'reducers/AppReducer'
import Input from 'components/ui/Input'
import Form from 'components/ui/Form'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getDefaultState()
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getDefaultState() {
    return {
      email: '',
      password: '',
      errorMsg: ''
    }
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value.trim().toLowerCase()
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.login({
      email: this.state.email,
      password: this.state.password
    }).catch(err => {
      this.setState({
        errorMsg: err.toString()
      })
    })
  }

  render() {
    return (
      <div className="main">
        <div className="container">
          <div className="row justify-content-center align-items-center sign">
            <div className="col-sm-6">
              <BlockUi blocking={this.props.ui.isLoading}>
                <h1 className="main-color">Login</h1>
                <Form
                  isError={this.state.errorMsg !== ''}
                  msg={this.state.errorMsg}
                  onSubmit={this.handleSubmit}
                >
                  <Input
                    id="js-email"
                    type="text"
                    label="Email"
                    placeholder="Enter Email..."
                    onChange={this.handleEmailChange}
                  />

                  <Input
                    id="js-password"
                    type="password"
                    label="Password"
                    placeholder="Enter password..."
                    onChange={this.handlePasswordChange}
                  />
                  <div className="form-group">
                    <button type="submit" className="btn btn-success btn-block">
                      Login
                    </button>
                  </div>
                </Form>
              </BlockUi>
            </div>
          </div>
        </div>
      </div>
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
    login: input => dispatch(login(input))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
