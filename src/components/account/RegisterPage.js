import React from 'react'
import BlockUi from 'react-block-ui'
import Form from 'components/ui/Form'
import Input from 'components/ui/Input'
import { connect } from 'react-redux'
import { register } from 'reducers/UserReducer'

class RegisterPage extends React.Component {
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
    this.props.register({
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center sign">
          <div className="col-sm-6">
            <BlockUi blocking={this.props.ui.register.isLoading}>
              <h1 className="main-color">Register</h1>
              <Form
                isSuccess={this.props.ui.register.isSuccess}
                isError={this.props.ui.register.isError}
                msg={this.props.ui.register.msg}
                onSubmit={this.handleSubmit}
              >
                <Input
                  id="js-email"
                  type="text"
                  label="Email"
                  placeholder="Your email ..."
                  onChange={this.handleEmailChange}
                />
                <Input
                  id="js-password"
                  type="password"
                  label="Password"
                  placeholder="Your password ..."
                  onChange={this.handlePasswordChange}
                />

                <div className="form-group">
                  <button className="btn btn-success btn-block" type="submit">
                    Register
                  </button>
                </div>
              </Form>
            </BlockUi>
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
    register: input => dispatch(register(input))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage)
