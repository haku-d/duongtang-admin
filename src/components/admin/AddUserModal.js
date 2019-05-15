import React from 'react'
import { connect } from 'react-redux'
import {
  Modals,
  ModalHead,
  ModalBody,
  ModalFooter
} from 'components/modals/Modal'

import client from 'client'
import Form from 'components/ui/Form'
import Input from 'components/ui/Input'
import { ADD_USER_CANCELED, ADD_USER_COMPLETED } from 'actions/user'

class AddUserModal extends React.Component {

  initialState = {
    email: '',
    password: '',
    hasError: false,
    msg: ''
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  handleSubmit(e) {
    e.preventDefault()
    client.post('/admin/add_user', {
      email: this.state.email,
      password: this.state.password
    }).then(rs => {
      if (rs.data.status === 200) {
        this.reset()
        this.props.complete()
      } else {
        this.setState({
          msg: rs.data.message,
          hasError: true
        })
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

  cancel(e) {
    e.preventDefault()
    this.reset()
    this.props.cancel()
  }

  reset() {
    this.setState({...this.initialState})
  }

  render() {
    return (
      <Modals
        modalSize={'modal-dialog modal-lg'}
        modalShow={this.props.isAddingUser}
      >
        <Form
          isError={this.state.hasError}
          msg={this.state.msg}
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
            </React.Fragment>
          </ModalBody>
          <ModalFooter>
            <React.Fragment>
              <button type="button" className="btn btn-default">
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Create
              </button>
            </React.Fragment>
          </ModalFooter>
        </Form>
      </Modals>
    )
  }
}

const mapStateToProps = state => {
  return state.user
}

const mapDispatchToProps = dispatch => {
  return {
    cancel: () => dispatch({ type: ADD_USER_CANCELED }),
    complete: () => dispatch({ type: ADD_USER_COMPLETED })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserModal)
