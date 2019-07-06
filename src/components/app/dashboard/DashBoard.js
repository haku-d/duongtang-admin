import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Main from 'components/common/ui/Main'
import Header from 'components/common/ui/Header'
import Card from 'components/common/ui/Card'

import { getRequest, getRequestDetail } from 'reducers/DashboardReducer'

class DashBoard extends React.Component {
  state = {
    timer: null
  }

  componentDidMount() {
    this.props.getRequest()
    this.props.getRequestDetail()

    // init timer
    const timer = setInterval(this.props.getRequest, 60 * 1000)
    this.setState({ timer })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  render() {
    return (
      <Main>
        <Header title={'DashBoard'} />
        <div className="row">
          <div className="col-sm-6">
            <Card title={'Today requests'} text={this.props.today_req} />
          </div>
          <div className="col-sm-6">
            <Card title={'Today earns'} text={this.props.totay_earn} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-align-right">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Email</th>
                  <th>Total request</th>
                  <th>Total spending</th>
                </tr>
              </thead>
              <tbody>
                {this.props.today_req_details.map(detail => (
                  <tr key={detail.id.toString()}>
                    <td>{detail.id}</td>
                    <td>
                      <Link to={`/users/${detail.id}`}>{detail.email}</Link>
                    </td>
                    <td>{detail.total_req}</td>
                    <td>{detail.total_money}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Main>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.dashboard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRequest: () => dispatch(getRequest()),
    getRequestDetail: () => dispatch(getRequestDetail())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard)
