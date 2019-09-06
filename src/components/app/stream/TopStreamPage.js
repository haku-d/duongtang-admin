import React from 'react'
import { connect } from 'react-redux'
import BlockUi from 'react-block-ui'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

import Main from 'components/common/ui/Main'
import Header from 'components/common/ui/Header'

import { getTopViewedStream } from 'reducers/StreamReducer'

class TopStreamPage extends React.Component {
  state = {
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 5
  }

  componentDidMount() {
    this.props.getStream()
  }

  handlePageClick = data => {
    this.props.getStream(data.selected + 1)
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
            <div className="col-sm-12">
              {/*<Pagination />*/}
              <ReactPaginate
                previousLabel={'«'}
                nextLabel={'»'}
                breakLabel={'...'}
                pageCount={this.props.pagination.total_pages}
                marginPagesDisplayed={this.state.marginPagesDisplayed}
                pageRangeDisplayed={this.state.pageRangeDisplayed}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination justify-content-end'}
                activeClassName={'active'}
                pageClassName={'page-item'}
                nextClassName={'page-item'}
                breakClassName={'page-item'}
                previousClassName={'page-item'}
                pageLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                breakLinkClassName={'page-link'}
                previousLinkClassName={'page-link'}
              />
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
  getStream: page => dispatch(getTopViewedStream(page))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopStreamPage)
