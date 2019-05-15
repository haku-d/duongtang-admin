import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LayoutSidebar from 'components/layout/LayoutSidebar'
import LayoutMain from 'components/layout/LayoutMain'
import LayoutPageHead from 'components/layout/LayoutPageHead'
import ReactPaginate from 'react-paginate'
import AddUserModal from './AddUserModal'
import { ADD_USER } from 'actions/user'

import getData from 'locals/data-list-user.json'

const ListUser = getData.data.ListUser

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getDefaultState()
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
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="#"
                      placeholder="Search everythink ..."
                      defaultValue=""
                    />
                  </div>
                  <div className="col-sm-3">
                    <button type="submit" className="btn btn-block btn-light">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-sm-12">
              <table className="table table-align-right">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.getDataPaginate.map(item => (
                    <tr key={item.id.toString()}>
                      <td>{item.id}</td>
                      <td>
                        <Link
                          to={`${this.props.match.path}/${item.id}
                          `}
                        >
                          {item.user.username}
                        </Link>
                      </td>
                      <td>
                        <button className="btn btn-xs btn-outline-secondary">
                          Disabled
                        </button>
                        |
                        <button
                          className="btn btn-xs btn-outline-danger"
                          onClick={this.showModal.bind(
                            this,
                            'modalUpdateKeyName',
                            item
                          )}
                        >
                          Deleted
                        </button>
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
    showAddUserModal: () => dispatch({ type: ADD_USER })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
