import React from 'react'
import { connect } from 'react-redux'

import {
  toggleAddBillingModal,
  getUserInfo,
  updateUserStatus
} from 'reducers/UserReducer'
import LayoutSidebar from 'components/layout/LayoutSidebar'
import LayoutMain from 'components/layout/LayoutMain'
import LayoutPageHead from 'components/layout/LayoutPageHead'
import AddBillingModal from 'components/user/AddBillingModal'

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
          <LayoutPageHead
            title={`User: ${user.email ? user.email : 'No email'}`}
          >
            <button
              className={`btn ${user.is_active ? 'btn-danger' : 'btn-success'}`}
              onClick={() =>
                this.props.updateUserStatus(user.id, !user.is_active)
              }
            >
              {user.is_active ? 'Disable' : 'Active'}
            </button>
          </LayoutPageHead>
        </div>
        <div className="col-sm-12 mg-bt-15">
          <div className="card card-money">
            <div className="row align-items-center">
              <div className="col-6">
                <h4>Balance</h4>
              </div>
              <div className="col-6 card-money-num">
                {user.balance} <small>vnđ</small>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apps.length > 0 ? (
                apps.map((item, index) => (
                  <tr key={index.toString()}>
                    <td>{item.label}</td>
                    <td>{item.api_key}</td>
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

  render() {
    return (
      <React.Fragment>
        <LayoutSidebar />
        <LayoutMain>
          <div className="row">
            {this.renderUserInfo(this.props.user)}
            {this.renderUserApps(this.props.userApps)}
          </div>
        </LayoutMain>
        <AddBillingModal userId={this.props.user.id} />
      </React.Fragment>
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
