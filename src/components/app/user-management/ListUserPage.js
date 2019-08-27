import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import BlockUi from 'react-block-ui'
import Moment from 'react-moment'
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
    window.addEventListener('resize', this.resize.bind(this))
    this.resize()
  }

  // Check isMobile pagination
  resize() {
    if (window.innerWidth < 767) {
      this.setState({
        marginPagesDisplayed: 1,
        pageRangeDisplayed: 1
      })
    }
  }

  componentWillUnmount() {
    this.props.toggleCreateUserModal(false)
  }

  getDefaultState() {
    return {
      filter: '',
      marginPagesDisplayed: 2,
      pageRangeDisplayed: 5
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
      <Main>
        <Header title={'Users'}>
          <button
            className="btn btn-success"
            onClick={() => this.props.toggleCreateUserModal(true)}
          >
            Add User
          </button>
        </Header>
        <BlockUi blocking={this.props.isLoading}>
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
                    <th>
                      <div className="text-break">Registered date</div>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.users.map(item => (
                    <tr key={item.id.toString()}>
                      <td>{item.id}</td>
                      <td>
                        <Link
                          className="text-break"
                          to={`${this.props.match.path}/${item.id}`}
                        >
                          {item.email ? item.email : 'No email'}
                        </Link>
                      </td>
                      <td>{numeral(item.balance).format('0,0')}</td>
                      <td>
                        <div className="fix-w-date">
                          <Moment format="YYYY-MM-DD HH:mm:ss">
                            {item.created_date}
                          </Moment>
                        </div>
                      </td>
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
        <CreateUserModal />
      </Main>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    meta: state.user.pagination,
    isLoading: state.user.isLoading
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
