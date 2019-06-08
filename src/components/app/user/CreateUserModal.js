import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Modal,
  ModalHead,
  ModalBody,
  ModalFooter
} from 'components/common/modal'

import Form from 'components/common/ui/Form'
import Input from 'components/common/ui/Input'
import { addUser, toggleCreateUserModal } from 'reducers/UserReducer'

class CreateUserModal extends React.Component {
  defaultState = {
    email: '',
    password: '',
    facebook: '',
    hasError: false,
    msg: ''
  }

  constructor(props) {
    super(props)
    this.state = this.defaultState
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props
      .addUser({
        email: this.state.email,
        password: this.state.password,
        facebook: this.state.facebook
      })
      .then(userId => {
        if (userId) {
          this.props.history.push(`/users/${userId}`)
        }
      })
      .catch(err => {
        this.setState({
          hasError: true,
          msg: err.toString()
        })
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

  close(e) {
    e.preventDefault()
    this.setState(this.initialState)
    this.props.toggleAddUserModal()
  }

  render() {
    return (
      <Modal
        modalSize={'modal-dialog modal-lg'}
        modalShow={this.props.isOpenCreateUserModal}
      >
        <Form
          isError={this.state.hasError}
          msg={this.state.msg}
          onSubmit={this.handleSubmit.bind(this)}
        >
          <ModalHead close={this.props.toggleCreateUserModal}>
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
                onClick={this.props.toggleCreateUserModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Create
              </button>
            </React.Fragment>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    ...state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user)),
    toggleCreateUserModal: () => dispatch(toggleCreateUserModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateUserModal))
