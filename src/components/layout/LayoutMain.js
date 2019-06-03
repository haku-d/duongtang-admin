import React from 'react'
import { connect } from 'react-redux'
import BlockUi from 'react-block-ui'

class LayoutMain extends React.Component {
  render() {
    return (
      <div className="main">
        <BlockUi blocking={this.props.isLoading}>
          <div className="container">{this.props.children}</div>
        </BlockUi>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.ui
  }
}

export default connect(mapStateToProps)(LayoutMain)
