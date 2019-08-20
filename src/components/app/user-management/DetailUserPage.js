import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'

import {
  toggleAddBillingModal,
  toggleAddUserAppModal,
  getUserInfo,
  updateUserStatus,
  disableApp,
  enableApp,
  editApp
} from 'reducers/UserReducer'
import Main from 'components/common/ui/Main'
import Header from 'components/common/ui/Header'
import AddBillingModal from './AddBillingModal'
import { Confirm } from 'components/common/modal'
import AddUserAppModal from './AddUserAppModal'
import EditUserAppModal from './EditUserAppModal'

class DetailUserPage extends React.Component {
  componentDidMount() {
    this.props.getUserInfo(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.toggleAddBillingModal(false)
  }

  renderUserInfo(user) {
    return (
      <React.Fragment>
        <div className="col-sm-12">
          <Header title={`Email: ${user.email ? user.email : 'No email'}`} />
        </div>
        <div className="col-sm-12 mg-bt-15">
          <div className="card card-money">
            <div className="row align-items-center">
              <div className="col-6">
                <h4>
                  Facebook: <a href={user.facebook}>{user.facebook}</a>
                </h4>
                <h4>
                  Website: <a href={user.website}>{user.website}</a>
                </h4>
              </div>
              <div className="col-6 card-money-num">
                <h4>
                  Balance: {numeral(user.balance).format('0,0')}{' '}
                  <small>gạo</small>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  renderUserApps(apps) {
    return (
      <div className="col-sm-12">
        <h4>List Api Key</h4>
        <div className="table-responsive">
          <table className="table table-align-right">
            <thead>
              <tr>
                <th>App key</th>
                <th>Stream type</th>
                <th>Short domain</th>
                <th>Created data</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apps.length > 0 ? (
                apps.map((item, index) => (
                  <tr key={index.toString()}>
                    <td>{item.api_key}</td>
                    <td>{item.stream_type}</td>
                    <td>{item.short_domain}</td>
                    <td>{item.created_date}</td>
                    <td>
                      <Confirm title="Confirm" description="Are your sure?">
                        {confirm =>
                          item.status === 1 ? (
                            <button
                              className="btn btn-xs btn-outline-danger"
                              onClick={confirm(() =>
                                this.props.disableApp(item.api_key)
                              )}
                            >
                              Disable
                            </button>
                          ) : (
                            <button
                              className="btn btn-xs btn-outline-success"
                              onClick={confirm(() =>
                                this.props.enableApp(item.api_key)
                              )}
                            >
                              Enable
                            </button>
                          )
                        }
                      </Confirm>
                      |
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => this.props.editApp(item.api_key)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="pd-0">
                    <div className="alert alert-warning text-center">
                      No app found!
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <hr />
      </div>
    )
  }

  renderUserAction(user) {
    return (
      <div className="col-sm-12 mg-bt-15">
        <button
          className="btn btn-success mr-1"
          onClick={() => this.props.toggleAddBillingModal(true)}
        >
          Add Money
        </button>
        <button
          className="btn btn-success mr-1"
          onClick={() => this.props.toggleAddUserAppModal(true)}
        >
          Add new app
        </button>
        <Confirm title="Confirm" description="Are your sure?">
          {confirm => (
            <button
              className={`btn ${user.is_active ? 'btn-danger' : 'btn-success'}`}
              onClick={confirm(() =>
                this.props.updateUserStatus(user.id, !user.is_active)
              )}
            >
              {user.is_active ? 'Disable user' : 'Active user'}
            </button>
          )}
        </Confirm>
      </div>
    )
  }

  renderUserTransaction(transactions) {
    return (
      <div className="col-sm-12">
        <h4>Transaction history</h4>
        <div className="table-responsive">
          <table className="table table-align-right">
            <thead>
              <tr>
                <th>Transaction date</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.items.length > 0 ? (
                transactions.items.map((item, index) => (
                  <tr key={index.toString()}>
                    <td>{item.transaction_datetime}</td>
                    <td>{item.transaction_type}</td>
                    <td>{numeral(item.balance).format('0,0')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="pd-0">
                    <div className="alert alert-warning text-center">
                      No transaction found!
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Main>
        <div className="row">
          {this.renderUserInfo(this.props.user)}
          {this.renderUserAction(this.props.user)}
          {this.renderUserApps(this.props.userApps)}
          {this.renderUserTransaction(this.props.transactions)}
        </div>
        <AddBillingModal userId={this.props.user.id} />
        <AddUserAppModal userId={this.props.user.id} />
        <EditUserAppModal />
      </Main>
    )
  }
}

const mapStateToProps = state => ({
  ...state.user
})
const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: id => dispatch(getUserInfo(id)),
    toggleAddBillingModal: isOpen => dispatch(toggleAddBillingModal(isOpen)),
    toggleAddUserAppModal: isOpen => dispatch(toggleAddUserAppModal(isOpen)),
    updateUserStatus: (id, is_active) =>
      dispatch(updateUserStatus(id, is_active)),
    disableApp: api_key => dispatch(disableApp(api_key)),
    enableApp: api_key => dispatch(enableApp(api_key)),
    editApp: api_key => dispatch(editApp(api_key))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailUserPage)
