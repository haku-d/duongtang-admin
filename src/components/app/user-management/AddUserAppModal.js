import React from 'react'
import { connect } from 'react-redux'

import {
  Modal,
  ModalHead,
  ModalBody,
  ModalFooter
} from 'components/common/modal'
import Form from 'components/common/ui/Form'
import Input from 'components/common/ui/Input'

import { toggleAddUserAppModal, addApp } from 'reducers/UserReducer'

class AddUserAppModal extends React.Component {
  initialState = {
    streamType: '',
    shortDomain: ''
  }

  constructor(props) {
    super(props)
    this.state = this.initialState

    this.handleStreamTypeChanged = this.handleStreamTypeChanged.bind(this)
    this.handleShortDomainChanged = this.handleShortDomainChanged.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const userId = parseInt(this.props.userId, 10)
    const streamType = this.state.streamType
    const shortDomain = this.state.shortDomain
    this.props.addApp(userId, streamType, shortDomain)
  }

  handleStreamTypeChanged(e) {
    this.setState({
      streamType: e.target.value
    })
  }

  handleShortDomainChanged(e) {
    this.setState({
      shortDomain: e.target.value
    })
  }

  reset() {
    this.setState({ ...this.initialState })
  }

  render() {
    return (
      <Modal
        modalSize={'modal-dialog modal-md'}
        modalShow={this.props.isOpenAddUserAppModal}
      >
        <Form
          isError={this.state.hasError}
          msg={this.state.msg}
          onSubmit={this.handleSubmit.bind(this)}
        >
          <ModalHead close={this.props.toggleAddUserAppModal}>
            <h5 className="modal-title">Create new app</h5>
          </ModalHead>
          <ModalBody>
            <React.Fragment>
              <Input
                id="js-amount"
                label={'Stream Type'}
                type={'text'}
                placeholder="photo,proxy"
                onChange={this.handleStreamTypeChanged}
              />
              <Input
                id="js-amount"
                label={'Short domain'}
                type={'text'}
                placeholder="http://go.clgt.vn"
                onChange={this.handleShortDomainChanged}
              />
            </React.Fragment>
          </ModalBody>
          <ModalFooter>
            <React.Fragment>
              <button
                type="button"
                className="btn btn-default"
                onClick={this.props.toggleAddUserAppModal}
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
    addApp: (id, streamType, shortDomain) =>
      dispatch(addApp(id, streamType, shortDomain)),
    toggleAddUserAppModal: () => dispatch(toggleAddUserAppModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserAppModal)
