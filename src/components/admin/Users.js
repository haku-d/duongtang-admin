import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import BlockUi from 'react-block-ui'
import LayoutSidebar from 'components/layout/LayoutSidebar'
import LayoutMain from 'components/layout/LayoutMain'
import LayoutPageHead from 'components/layout/LayoutPageHead'
import ReactPaginate from 'react-paginate'
import AddUserModal from './AddUserModal'
import { getUsers, showAddUserModal } from 'reducers/UsersReducer'

const ENTER_KEY = 13

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getDefaultState()
    props.getUsers()
  }

  getDefaultState() {
    return {
      filter: ''
    }
  }

  handleSearchKeyDown(e) {
    if (e.keyCode !== ENTER_KEY) {
      return
    }

    e.preventDefault()
    this.props.getUsers(this.state.filter)
  }

  handleSearchQueryChanged(e) {
    this.setState({
      filter: e.target.value
    })
  }

  handlePageClick = data => {
    this.props.getUsers(this.state.filter, data.selected + 1)
  }

  render() {
    return (
      <React.Fragment>
        <LayoutSidebar />
        <LayoutMain>
          <React.Fragment>
            <div className="col-sm-12">
              <LayoutPageHead title={'Users'}>
                <button
                  className="btn btn-success"
                  onClick={() => this.props.showAddUserModal()}
                >
                  Add User
                </button>
              </LayoutPageHead>
            </div>

            <div className="col-sm-12">
              <form className="form-search">
                <div className="row">
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      id="#"
                      placeholder="Search by id or email"
                      value={this.state.filter}
                      onKeyDown={this.handleSearchKeyDown.bind(this)}
                      onChange={this.handleSearchQueryChanged.bind(this)}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="col-sm-12">
              <BlockUi blocking={this.props.isLoading}>
                <table className="table table-align-right">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Username</th>
                      <th>Created date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.list.map(item => (
                      <tr key={item.id.toString()}>
                        <td>{item.id}</td>
                        <td>
                          <Link
                            to={`${this.props.match.path}/${item.id}
                          `}
                          >
                            {item.email ? item.email : 'No email'}
                          </Link>
                        </td>
                        <td>{item.created_date}</td>
                        <td>
                          {item.is_active ? (
                            <button
                              className="btn btn-xs btn-outline-danger"
                              onClick={this.props.updateStatus.bind(
                                this,
                                item.id,
                                false
                              )}
                            >
                              Disable
                            </button>
                          ) : (
                            <button
                              className="btn btn-xs btn-outline-success"
                              onClick={this.props.updateStatus.bind(
                                this,
                                item.id,
                                true
                              )}
                            >
                              Enable
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
                </table>
              </BlockUi>
              <hr />
            </div>

            <div className="col-sm-12">
              {/*<Pagination />*/}
              <ReactPaginate
                previousLabel={'«'}
                nextLabel={'»'}
                breakLabel={'...'}
                pageCount={this.props.pagination.total_pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
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
          </React.Fragment>
        </LayoutMain>
        <AddUserModal />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.ui.getUsers,
    ...state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showAddUserModal: () => dispatch(showAddUserModal()),
    getUsers: (filter, page) => dispatch(getUsers(filter, page)),
    updateStatus: () => {}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
