import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LayoutSidebar from 'components/layout/LayoutSidebar'
import LayoutMain from 'components/layout/LayoutMain'
import LayoutPageHead from 'components/layout/LayoutPageHead'
import ReactPaginate from 'react-paginate'
import AddUserModal from './AddUserModal'
import { ADD_USER } from 'actions/user'
import { getUsers, disableUser, enabledUser } from 'reducers/UserReducer'

import getData from 'locals/data-list-user.json'

const ListUser = getData.data.ListUser

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getDefaultState()
    this.props.getUsers()
  }
  getDefaultState = () => ({
    modalAddUser: false,
    modalUpdateUser: false,
    modalGoogleDrive: false,
    modalRestMoney: false,
    getData: ListUser,
    getDataPaginate: ListUser.slice(0, 5),
    pageCount: Math.ceil(ListUser.length / 5)
  })

  // closeModal all modal target modal name
  closeModal = (prTarget, e) => {
    let targetModal = e.target
    if (targetModal.getAttribute('data-modal') === prTarget) {
      this.setState({
        [prTarget]: false
      })
    }
  }

  // showModal with update state Data follow only item and modalName
  showModal = (prNameTarget, prItemOfData, prThis) => {
    // console.log(prItemOfData)
    this.setState({
      [prNameTarget]: true,
      getData: prItemOfData
    })
  }

  showModalAddUser() {
    this.setState({
      modalAddUser: true
    })
  }

  addNewUser() {}

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
                  onClick={() => this.props.showAddUserModal()}>
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
                      defaultValue=""
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
                    <th>Created date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.list_users && this.props.list_users.users.map(item => (
                    <tr key={item.id.toString()}>
                      <td>{item.id}</td>
                      <td>
                        <Link
                          to={`${this.props.match.path}/${item.id}
                          `}
                        >
                          {item.email ? item.email : 'No email found'}
                        </Link>
                      </td>
                      <td>{item.created_date}</td>
                      <td>
                        {
                          item.is_active ?
                          <button className="btn btn-xs btn-outline-danger"
                            onClick={this.props.disableUser.bind(this, item.id)}>
                            Disable
                          </button> :
                          <button className="btn btn-xs btn-outline-success"
                            onClick={this.props.enabledUser.bind(this, item.id)}>
                            Enable
                          </button>
                        }
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
                pageCount={this.state.pageCount}
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
        <AddUserModal/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state.user
}

const mapDispatchToProps = dispatch => {
  return {
    showAddUserModal: () => dispatch({ type: ADD_USER }),
    getUsers: () => dispatch(getUsers()),
    disableUser: (id) => dispatch(disableUser(id)),
    enabledUser: (id) => dispatch(enabledUser(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
