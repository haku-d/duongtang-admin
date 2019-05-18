import React from 'react'
import { connect } from 'react-redux'
import {
  Modals,
  ModalHead,
  ModalBody,
  ModalFooter
} from 'components/modals/Modal'
import Form from 'components/ui/Form'
import Input from 'components/ui/Input'

import { addBilling } from 'reducers/UserReducer'

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
    this.props.addBilling(userId, amount).then(rs => this.props.closeHandler())
  }

  handleAmountChanged(e) {
    this.setState({
      amount: e.target.value
    })
  }

  cancel(e) {
    e.preventDefault()
    this.reset()
    this.props.closeHandler()
  }

  reset() {
    this.setState({ ...this.initialState })
  }

  render() {
    return (
      <Modals
        modalSize={'modal-dialog modal-lg'}
        modalShow={this.props.isOpening}
      >
        <Form
          isError={this.state.hasError}
          msg={this.state.msg}
          onSubmit={this.handleSubmit.bind(this)}
        >
          <ModalHead closeModal={this.cancel.bind(this)}>
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
                onClick={this.cancel.bind(this)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Update
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
    addBilling: (id, amount) => dispatch(addBilling(id, amount))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBillingModal)
