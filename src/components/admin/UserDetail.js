import React from 'react'
import { connect } from 'react-redux'

import client from 'client'
import LayoutSidebar from 'components/layout/LayoutSidebar'
import LayoutMain from 'components/layout/LayoutMain'
import LayoutPageHead from 'components/layout/LayoutPageHead'

import AddBillingModal from './AddBillingModal'
import { getUserInfo } from 'reducers/UserReducer'

class UserDetail extends React.Component {
  initialState = {
    user: null,
    user_apps: [],
    isUpdateBilling: false
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.props.getUserInfo(this.props.match.params.id)
  }

  getUserInfo() {
    client.get(`/user/${this.props.match.params.id}`).then(rs => {
      this.setState({
        user: rs.data
      })
    })
  }

  getUserApps() {
    client.get(`/admin/user/${this.props.match.params.id}/apps`).then(rs => {
      this.setState({
        user_apps: rs.data.apps
      })
    })
  }

  openAddBillingModal() {
    this.setState({
      isUpdateBilling: true
    })
  }

  closeAddBillingModal() {
    this.setState({
      isUpdateBilling: false
    })
  }

  userInfo(user) {
    return (
      <React.Fragment>
        <div className="col-sm-12">
          <LayoutPageHead
            title={`Email: ${user.email ? user.email : 'No email'}`}
          />
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
            onClick={this.openAddBillingModal.bind(this)}
          >
            Add Money
          </button>
        </div>
      </React.Fragment>
    )
  }

  userApp(apps) {
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
            {this.props.user ? this.userInfo(this.props.user) : null}
            {this.props.user_apps ? this.userApp(this.props.user_apps) : null}
          </div>
        </LayoutMain>
        <AddBillingModal
          userId={this.props.match.params.id}
          isOpening={this.state.isUpdateBilling}
          closeHandler={this.closeAddBillingModal.bind(this)}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state.user
}

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: id => dispatch(getUserInfo(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail)
