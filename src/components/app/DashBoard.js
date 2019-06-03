import React from 'react'
import { connect } from 'react-redux'

import LayoutSidebar from 'components/layout/LayoutSidebar'
import LayoutMain from 'components/layout/LayoutMain'
import LayoutPageHead from 'components/layout/LayoutPageHead'
import Card from 'components/ui/Card'

class DashBoard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <LayoutSidebar />
        <LayoutMain>
          <div className="row">
            <div className="col-sm-12">
              <LayoutPageHead title={'DashBoard'} />
            </div>
            <div className="col-sm-6">
              <Card title={'Link Google Drive'} number={15.035} />
            </div>
            <div className="col-sm-6">
              <Card title={'Account Google Photo'} number={5} />
            </div>
          </div>
        </LayoutMain>
      </React.Fragment>
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
