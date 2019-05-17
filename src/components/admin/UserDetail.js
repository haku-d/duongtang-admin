import React from 'react'

import client from 'client'
import LayoutSidebar from 'components/layout/LayoutSidebar'
import LayoutMain from 'components/layout/LayoutMain'
import LayoutPageHead from 'components/layout/LayoutPageHead'

class UserDetail extends React.Component {

  initialState = {
    user: null,
    user_apps : []
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.getUserInfo()
    this.getUserApps()
  }

  getUserInfo() {
    client.get(`/user/${this.props.match.params.id}`)
      .then(rs => {
        this.setState({
          user: rs.data
        })
      })
  }

  getUserApps() {
    client.get(`/admin/user/${this.props.match.params.id}/apps`)
      .then(rs => {
        this.setState({
          user_apps: rs.data.apps
        })
      })
  }

  userInfo(user) {
    return (
      <React.Fragment>
        <div className="col-sm-12">
          <LayoutPageHead
            title={`User: ${user.email}`}
          />
        </div>
        <div className="col-sm-12 mg-bt-15">
          <div className="card card-money">
            <div className="row align-items-center">
              <div className="col-6">
                <h4>Balance</h4>
              </div>
              <div className="col-6 card-money-num">{user.balance} <small>vnđ</small></div>
            </div>
          </div>
          <button
            className="btn btn-success float-right">
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
              {
                apps.length > 0 ? apps.map((item, index) => (
                  <tr key={index.toString()}>
                    <td>{item.label}</td>
                    <td>{item.api_key}</td>
                    <td>
                      <button className="btn btn-xs btn-outline-danger">
                        Delete
                      </button>
                      |
                      <button
                        className="btn btn-xs btn-success">
                        Edit
                      </button>
                    </td>
                  </tr>
                )): <tr><td colSpan="3">No app found</td></tr>
              }
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
            {this.state.user ? this.userInfo(this.state.user) : null}
            {this.state.user_apps ? this.userApp(this.state.user_apps) : null}
          </div>
        </LayoutMain>
      </React.Fragment>
    )
  }
}
export default UserDetail
