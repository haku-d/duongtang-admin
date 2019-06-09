import React from 'react'
import { connect } from 'react-redux'

import {
  toggleAddBillingModal,
  getUserInfo,
  updateUserStatus
} from 'reducers/UserReducer'
import Main from 'components/common/ui/Main'
import Header from 'components/common/ui/Header'
import AddBillingModal from './AddBillingModal'
import { Confirm } from 'components/common/modal'

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
                  Balance: {user.balance} <small>vnđ</small>
                </h4>
              </div>
            </div>
          </div>
          <button
            className="btn btn-success float-right"
            onClick={() => this.props.toggleAddBillingModal(true)}
          >
            Add Money
          </button>
        </div>
      </React.Fragment>
    )
  }

  renderUserApps(apps) {
    return (
      <React.Fragment>
        <div className="col-sm-12">
          <h4>List Api Key</h4>
          <table className="table table-align-right">
            <thead>
              <tr>
                <th>App Id</th>
                <th>App Key</th>
                <th>Stream type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apps.length > 0 ? (
                apps.map((item, index) => (
                  <tr key={index.toString()}>
                    <td>{item.label}</td>
                    <td>{item.api_key}</td>
                    <td>{item.stream_type}</td>
                    <td>
                      <button className="btn btn-xs btn-outline-danger">
                        Delete
                      </button>
                      |<button className="btn btn-xs btn-success">Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No app found</td>
                </tr>
              )}
            </tbody>
          </table>
          <hr />
        </div>
      </React.Fragment>
    )
  }

  renderUserAction(user) {
    return (
      <div className="col-sm-12">
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

  render() {
    return (
      <Main>
        <div className="row">
          {this.renderUserInfo(this.props.user)}
          {this.renderUserApps(this.props.userApps)}
          {this.renderUserAction(this.props.user)}
        </div>
        <AddBillingModal userId={this.props.user.id} />
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
    updateUserStatus: (id, is_active) =>
      dispatch(updateUserStatus(id, is_active))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailUserPage)
