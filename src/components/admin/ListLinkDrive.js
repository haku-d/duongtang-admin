import React from 'react'
import { Link } from 'react-router-dom'
import LayoutSidebar from 'components/layout/LayoutSidebar'
import LayoutMain from 'components/layout/LayoutMain'
import LayoutPageHead from 'components/layout/LayoutPageHead'
import ReactPaginate from 'react-paginate'
import {
  Modals,
  ModalHead,
  ModalBody,
  ModalFooter
} from 'components/modals/Modal'
// import HelperFunction from 'helpers/HelperFunction'

// Get Data Demo
import getData from '../../locals/data-list-link.json'
const ListLink = getData.data.ListLink

class ListLinkDrive extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getDefaultState()
  }
  getDefaultState = () => ({
    modalEmbedVideo: false,
    limitCount: 5,
    getDataPaginate: ListLink.slice(0, 5),
    pageCount: Math.ceil(ListLink.length / 5)
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
  showModal = (prNameTarget, prItemOfData, e) => {
    this.setState({
      [prNameTarget]: true,
      getData: prItemOfData
    })
  }

  // callBack data show pagination table
  handlePageClick = data => {
    this.setState({
      getDataPaginate: ListLink.slice(
        Math.ceil(data.selected * this.state.limitCount),
        Math.ceil(data.selected * this.state.limitCount) + this.state.limitCount
      )
    })
  }

  render() {
    return (
      <React.Fragment>
        <LayoutSidebar />
        <LayoutMain>
          <React.Fragment>
            <div className="col-sm-12">
              <LayoutPageHead title={'List Link Google Drive'}>
                <button
                  className="btn btn-success"
                  onClick={() =>
                    this.setState({
                      modalCreateStream: true
                    })
                  }
                >
                  Add File
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
                      placeholder="Search stream id ..."
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
                    <th>Stream id</th>
                    <th>Username</th>
                    <th>Filename</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.getDataPaginate.map((item, index) => (
                    <tr key={item.id}>
                      <td>{item.id.toString()}</td>
                      <td>
                        <Link to="`{item.stream_link}`">
                          {item.stream_link}
                        </Link>
                      </td>
                      <td>{item.username}</td>
                      <td>{item.filename}</td>
                      <td>
                        <span>{item.date}</span>
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
                containerClassName={'pagination justify-content-center'}
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
        {/*modalCreateStream*/}
        <Modals
          modalSize={'modal-dialog modal-lg'}
          modalShow={this.state.modalCreateStream}
          closeModal={this.closeModal.bind(this, 'modalCreateStream')}
          targetState={'modalCreateStream'}
        >
          <React.Fragment>
            <ModalHead
              closeModal={this.closeModal.bind(this, 'modalCreateStream')}
              targetState={'modalCreateStream'}
            >
              <h5 className="modal-title">Link Google Drive</h5>
            </ModalHead>
            <ModalBody>
              <form className="form-add-user" action="">
                <div className="form-group">
                  <textarea
                    className="form-control form-textarea"
                    rows="3"
                    placeholder="https://drive.google.com/file/d/0B7MB8rvfJ1jCQjIyOXliUV9OVW8"
                  />
                </div>
                <p>
                  <small className="form-text text-muted">
                    Only my link above will work, if you want to use your link
                    contact me for apikey.
                  </small>
                  <small className="form-text text-muted">
                    e.g: https://yourdrivepublic.google.com/xxx | 5
                  </small>
                </p>
              </form>
            </ModalBody>
            <ModalFooter>
              <React.Fragment>
                <button type="button" className="btn btn-success">
                  Create Stream Link
                </button>
              </React.Fragment>
            </ModalFooter>
          </React.Fragment>
        </Modals>
        {/*End modalCreateStream*/}
      </React.Fragment>
    )
  }
}
export default ListLinkDrive
