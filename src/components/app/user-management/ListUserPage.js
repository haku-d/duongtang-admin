import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import numeral from 'numeral'
import Main from 'components/common/ui/Main'
import Header from 'components/common/ui/Header'
import ReactPaginate from 'react-paginate'
import CreateUserModal from './CreateUserModal'
import {
  getUsers,
  toggleCreateUserModal,
  updateUserStatus
} from 'reducers/UserReducer'

import { Confirm } from 'components/common/modal'

const ENTER_KEY = 13

class ListUserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getDefaultState()
  }

  componentDidMount() {
    this.props.getUsers()
  }

  componentWillUnmount() {
    this.props.toggleCreateUserModal(false)
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
        <Main>
          <Header title={'Users'}>
            <button
              className="btn btn-success"
              onClick={() => this.props.toggleCreateUserModal(true)}
            >
              Add User
            </button>
          </Header>
          <div className="row">
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
              <table className="table table-align-right">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Balance</th>
                    <th>Registered date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.users.map(item => (
                    <tr key={item.id.toString()}>
                      <td>{item.id}</td>
                      <td>
                        <Link to={`${this.props.match.path}/${item.id}`}>
                          {item.email ? item.email : 'No email'}
                        </Link>
                      </td>
                      <td>{numeral(item.balance).format('0,0')}</td>
                      <td>{item.created_date}</td>
                      <td>
                        <Confirm title="Confirm" description="Are your sure?">
                          {confirm => (
                            <button
                              className={`btn btn-xs btn-outline-${
                                item.is_active ? 'danger' : 'success'
                              }`}
                              onClick={confirm(() =>
                                this.props.updateUserStatus(
                                  item.id,
                                  !item.is_active
                                )
                              )}
                            >
                              {item.is_active ? 'Disable' : 'Enable'}
                            </button>
                          )}
                        </Confirm>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
            </div>

            <div className="col-sm-12">
              {/*<Pagination />*/}
              <ReactPaginate
                previousLabel={'«'}
                nextLabel={'»'}
                breakLabel={'...'}
                pageCount={this.props.meta.total_pages}
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
          </div>
        </Main>
        <CreateUserModal />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    meta: state.user.pagination
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUsers: (filter, page) => dispatch(getUsers(filter, page)),
    toggleCreateUserModal: isOpen => dispatch(toggleCreateUserModal(isOpen)),
    updateUserStatus: (id, is_active) =>
      dispatch(updateUserStatus(id, is_active))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListUserPage)
