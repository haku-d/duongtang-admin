import React from 'react'
import { connect } from 'react-redux'

import { toggleEditUserAppModal, updateApp } from 'reducers/UserReducer'

import {
  Modal,
  ModalHead,
  ModalBody,
  ModalFooter
} from 'components/common/modal'
import Form from 'components/common/ui/Form'

class EditUserAppModal extends React.Component {
  state = {
    stream_type: null,
    short_domain: null
  }

  handleSubmit(e) {
    e.preventDefault()
    const app = this.props.editingUserApp
    app.short_domain = this.state.short_domain || app.short_domain
    app.stream_type = this.state.stream_type || app.stream_type
    this.props.updateApp(app)
  }

  handleStreamTypeChange(e) {
    this.setState({
      stream_type: e.target.value
    })
  }

  handleShortDomainChange(e) {
    this.setState({
      short_domain: e.target.value
    })
  }

  render() {
    return this.props.isOpenEditUserAppModal ? (
      <Modal modalSize={'modal-dialog modal-md'} modalShow={true}>
        <Form>
          <ModalHead close={this.props.toggleEditUserAppModal}>
            <h5 className="modal-title">Update app info</h5>
          </ModalHead>
          <ModalBody>
            <React.Fragment>
              <div className="form-group">
                <label>Stream Type</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={this.props.editingUserApp.stream_type}
                  onChange={this.handleStreamTypeChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <label>Short Domain</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={this.props.editingUserApp.short_domain}
                  onChange={this.handleShortDomainChange.bind(this)}
                />
              </div>
            </React.Fragment>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-default"
              onClick={this.props.toggleEditUserAppModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={this.handleSubmit.bind(this)}
            >
              Update
            </button>
          </ModalFooter>
        </Form>
      </Modal>
    ) : null
  }
}

const mapStateToProps = state => {
  return {
    ...state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    toggleEditUserAppModal: () => dispatch(toggleEditUserAppModal()),
    updateApp: app => dispatch(updateApp(app))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserAppModal)
