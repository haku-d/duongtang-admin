import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHead, ModalBody, ModalFooter } from 'components/modal'
import Form from 'components/ui/Form'
import Input from 'components/ui/Input'

import { addBilling, toggleAddBillingModal } from 'reducers/UserReducer'

const customStyles = {
  content: {
    position: 'absolute',
    top: '10%',
    left: '25%',
    right: '25%',
    bottom: 'auto'
  }
}

class AddBillingModal extends React.Component {
  initialState = {
    amount: 0
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  handleSubmit(e) {
    e.preventDefault()
    const userId = parseInt(this.props.userId, 10)
    const amount = parseInt(this.state.amount)
    this.props
      .addBilling(userId, amount)
      .then(() => this.props.toggleAddBillingModal())
  }

  handleAmountChanged(e) {
    this.setState({
      amount: e.target.value
    })
  }

  reset() {
    this.setState({ ...this.initialState })
  }

  render() {
    return (
      <Modal
        modalSize={'modal-dialog modal-md'}
        modalShow={this.props.isOpenAddBillingModal}
      >
        <Form
          isError={this.state.hasError}
          msg={this.state.msg}
          onSubmit={this.handleSubmit.bind(this)}
        >
          <ModalHead close={this.props.toggleAddBillingModal}>
            <h5 className="modal-title">Add billing</h5>
          </ModalHead>
          <ModalBody>
            <React.Fragment>
              <Input
                id="js-amount"
                label={'Amount'}
                type={'number'}
                placeholder="0"
                onChange={this.handleAmountChanged.bind(this)}
              />
            </React.Fragment>
          </ModalBody>
          <ModalFooter>
            <React.Fragment>
              <button
                type="button"
                className="btn btn-default"
                onClick={this.props.toggleAddBillingModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Update
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
    addBilling: (id, amount) => dispatch(addBilling(id, amount)),
    toggleAddBillingModal: () => dispatch(toggleAddBillingModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBillingModal)
