import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BlockUi from 'react-block-ui'
import {
  Modals,
  ModalHead,
  ModalBody,
  ModalFooter
} from 'components/modals/Modal'

import Form from 'components/ui/Form'
import Input from 'components/ui/Input'

import { addUser, hideAddUserModal } from 'reducers/UsersReducer'

class AddUserModal extends React.Component {
  initialState = {
    email: '',
    password: '',
    facebook: '',
    hasError: false,
    msg: ''
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addUser({
      email: this.state.email,
      password: this.state.password,
      facebook: this.state.facebook
    }).then(action => {
      if (action.type === 'ADD_USER_COMPLETE') {
        this.props.history.push(`/users/${action.data}`)
      }
    })
  }

  handleEmailChanged(e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChanged(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleFacebookChanged(e) {
    this.setState({
      facebook: e.target.value
    })
  }

  cancel(e) {
    e.preventDefault()
    this.reset()
    this.props.hideAddUserModal()
  }

  reset() {
    this.setState({ ...this.initialState })
  }

  render() {
    return (
      <Modals
        modalSize={'modal-dialog modal-lg'}
        modalShow={this.props.isAddingUser}
      >
        <BlockUi blocking={this.props.isLoading}>
          <Form
            isError={this.props.hasError}
            msg={this.props.msg}
            onSubmit={this.handleSubmit.bind(this)}
          >
            <ModalHead closeModal={this.cancel.bind(this)}>
              <h5 className="modal-title">Add User</h5>
            </ModalHead>
            <ModalBody>
              <React.Fragment>
                <Input
                  id="js-email"
                  label={'Email'}
                  type={'email'}
                  placeholder={'Email'}
                  value={this.state.email}
                  onChange={this.handleEmailChanged.bind(this)}
                />
                <Input
                  id="js-password"
                  label={'Password'}
                  type={'password'}
                  placeholder={'******'}
                  value={this.state.password}
                  onChange={this.handlePasswordChanged.bind(this)}
                />
                <Input
                  id="js-facebook"
                  label={'Facebook'}
                  type={'text'}
                  placeholder={'Account facebook'}
                  value={this.state.facebook}
                  onChange={this.handleFacebookChanged.bind(this)}
                />
              </React.Fragment>
            </ModalBody>
            <ModalFooter>
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={this.cancel.bind(this)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Create
                </button>
              </React.Fragment>
            </ModalFooter>
          </Form>
        </BlockUi>
      </Modals>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.ui.addUser,
    ...state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user)),
    hideAddUserModal: () => dispatch(hideAddUserModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddUserModal))
