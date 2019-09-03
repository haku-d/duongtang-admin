import React from 'react'
import { connect } from 'react-redux'
import BlockUi from 'react-block-ui'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import Main from 'components/common/ui/Main'
import Header from 'components/common/ui/Header'

import { getTopViewedStream } from 'reducers/StreamReducer'

class TopStreamPage extends React.Component {
  componentDidMount() {
    this.props.getStream()
  }

  render() {
    return (
      <Main>
        <Header title={'Top viewed streams'} />
        <BlockUi blocking={this.props.isLoading}>
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-align-right">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>source_id</th>
                    <th>views</th>
                    <th width="30%">title</th>
                    <th>size</th>
                    <th>user</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.streams.map(stream => (
                    <tr key={stream.id.toString()}>
                      <td>{stream.id}</td>
                      <td>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://drive.google.com/open?id=${stream.source_id}`}
                        >
                          {stream.source_id}
                        </a>
                      </td>
                      <td>{stream.view}</td>
                      <td>
                        <div className="text-break">{stream.title}</div>
                      </td>
                      <td>{numeral(stream.size).format('0.00b')}</td>
                      <td>
                        <Link to={`/users/${stream.user_id}`}>
                          #ID {stream.user_id}
                        </Link>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-success">
                          Clone
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </BlockUi>
      </Main>
    )
  }
}

const mapStateToProps = state => {
  return state.stream
}
const mapDispatchToProps = dispatch => ({
  getStream: () => dispatch(getTopViewedStream())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopStreamPage)
