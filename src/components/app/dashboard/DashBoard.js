import React from 'react'
import { connect } from 'react-redux'

import Main from 'components/common/ui/Main'
import Header from 'components/common/ui/Header'
import Card from 'components/common/ui/Card'

class DashBoard extends React.Component {
  render() {
    return (
      <Main>
        <Header title={'DashBoard'} />
        <div className="row">
          <div className="col-sm-6">
            <Card title={'Link Google Drive'} number={15.035} />
          </div>
          <div className="col-sm-6">
            <Card title={'Account Google Photo'} number={5} />
          </div>
        </div>
      </Main>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard)
