import React from 'react'
import { connect } from 'react-redux'

import { getUser, getUserApps } from 'reducers/UserReducer'
import LayoutSidebar from 'components/layout/LayoutSidebar'
import LayoutMain from 'components/layout/LayoutMain'
import LayoutPageHead from 'components/layout/LayoutPageHead'
import AddBillingModal from 'components/user/AddBillingModal'

class DetailUserPage extends React.Component {
  constructor(props) {
    super(props)
    const userId = this.props.match.params.id
    this.state = this.getDefaultState()
    props.getUser(userId).then(user => {
      if (user) {
        this.setState({ user })
      }
    })
    props.getUserApps(userId).then(user_apps => {
      if (user_apps) {
        this.setState({ user_apps })
      }
    })
  }

  getDefaultState() {
    return {
      user: {},
      user_apps: []
    }
  }

  userInfo(user) {
    return (
      <React.Fragment>
        <div className="col-sm-12">
          <LayoutPageHead
            title={`Usser: ${user.email ? user.email : 'No email'}`}
          >
            <button
              className="btn btn-success">
              Active
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
          <button className="btn btn-success float-right">Add Money</button>
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
            {this.state.user ? this.userInfo(this.state.user) : null}
            {this.state.user_apps ? this.userApp(this.state.user_apps) : null}
          </div>
        </LayoutMain>
        <AddBillingModal/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => {
  return {
    getUser: id => dispatch(getUser(id)),
    getUserApps: id => dispatch(getUserApps(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailUserPage)
