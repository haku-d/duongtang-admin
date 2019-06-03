import React from 'react'
import Form from 'components/ui/Form'
import Input from 'components/ui/Input'
import { connect } from 'react-redux'
import { login } from 'reducers/MeReducer'
import BlockUi from 'react-block-ui'
import { Link } from 'react-router-dom'

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
      password: ''
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
    })
  }

  render() {
    return (
      <div className="main">
        <div className="container">
          <div className="row justify-content-center align-items-center sign">
            <div className="col-sm-6">
              <BlockUi blocking={this.props.ui.login.isLoading}>
                <h1 className="main-color">Login</h1>
                <Form
                  isSuccess={this.props.ui.login.isSuccess}
                  isError={this.props.ui.login.isError}
                  msg={this.props.ui.login.msg}
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
              <div className="well">
                Don't have account? <Link to="/account/register">Register</Link>
              </div>
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
