import React from 'react'
import Form from 'components/ui/Form'
import Input from 'components/ui/Input'
import Textarea from 'components/ui/Textarea'
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
// helper function
// import HelperFunction from 'helpers/HelperFunction'
// data demo
import getData from 'locals/data-list-user-detail.json'
const ListUser = getData.data.ListUser

class UserDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getDefaultState()
  }
  getDefaultState = () => ({
    modalUpdateKeyName: false,
    modalRestMoney: false,
    getData: ListUser,
    getDataPaginate: ListUser[0].user.apikey.slice(0, 5),
    pageCount: Math.ceil(ListUser[0].user.apikey.length / 5)
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

  userDisplay = props => {
    if (Number(this.props.match.params.id) === ListUser[0].id) {
      return (
        <React.Fragment>
          <div className="col-sm-12 mg-bt-15">
            <div className="card card-money">
              <div className="row align-items-center">
                <div className="col-6">
                  <h4>Rest Money</h4>
                </div>
                <div className="col-6 card-money-num">
                  100.000 <small>vnđ</small>
                </div>
              </div>
            </div>
            <button
              className="btn btn-success float-right"
              onClick={() => {
                this.setState({
                  modalAddMoney: true
                })
              }}
              data-modal={'modalAddMoney'}
            >
              Add Money
            </button>
          </div>
          <div className="col-sm-12">
            <h4>List Api Key</h4>
            <table className="table table-align-right">
              <thead>
                <tr>
                  <th>App Id</th>
                  <th>App Key</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.getDataPaginate.map((item, index) => (
                  <tr key={index.toString()}>
                    <td>{item.appid}</td>
                    <td>{item.appkey}</td>
                    <td>
                      <button className="btn btn-xs btn-outline-danger">
                        Delete
                      </button>
                      |
                      <button
                        className="btn btn-xs btn-success"
                        onClick={this.showModal.bind(
                          this,
                          'modalUpdateKeyName',
                          item
                        )}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
          </div>
          <div className="col-sm-12">
            <button className="btn btn-success float-right">Add New Key</button>
            {/*<Pagination />*/}
            <ReactPaginate
              previousLabel={'«'}
              nextLabel={'»'}
              breakLabel={'...'}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination justify-content-start'}
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
      )
    }
    return (
      <div className="col-sm-12 mg-bt-15">
        <div className="alert alert-warning">
          Không tìm thấy <strong>{this.props.match.params.username}</strong>
        </div>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <LayoutSidebar />
        <LayoutMain>
          <div className="row">
            <div className="col-sm-12">
              <LayoutPageHead
                title={`Detail User ${this.props.match.params.id}`}
              />
            </div>
            {this.userDisplay()}
          </div>
        </LayoutMain>

        {/*modalUpdateKeyName*/}
        <Modals
          modalSize={'modal-dialog modal-lg'}
          modalShow={this.state.modalUpdateKeyName}
          closeModal={this.closeModal.bind(this, 'modalUpdateKeyName')}
          targetState={'modalUpdateKeyName'}
        >
          <React.Fragment>
            <ModalHead
              closeModal={this.closeModal.bind(this, 'modalUpdateKeyName')}
              targetState={'modalUpdateKeyName'}
            >
              <h5 className="modal-title">Update</h5>
            </ModalHead>
            <ModalBody>
              <Form>
                <Input
                  label={'App Id'}
                  type={'text'}
                  placeholder={'AAdcasdAADadFF9812937'}
                />
                <Input
                  label={'App Key'}
                  type={'text'}
                  placeholder={'66fafadasdad123z123ac'}
                  disabled={true}
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={this.closeModal.bind(this, 'modalUpdateKeyName')}
                  data-modal={'modalUpdateKeyName'}
                >
                  Close
                </button>
                <button type="button" className="btn btn-success">
                  Update
                </button>
              </React.Fragment>
            </ModalFooter>
          </React.Fragment>
        </Modals>
        {/*End modalUpdateKeyName*/}

        {/*modalAddMoney*/}
        <Modals
          modalSize={'modal-dialog modal-lg'}
          modalShow={this.state.modalAddMoney}
          closeModal={this.closeModal.bind(this, 'modalAddMoney')}
          targetState={'modalAddMoney'}
        >
          <React.Fragment>
            <ModalHead
              closeModal={this.closeModal.bind(this, 'modalAddMoney')}
              targetState={'modalAddMoney'}
            >
              <h5 className="modal-title">Add Money 1330</h5>
            </ModalHead>
            <ModalBody>
              <Form>
                <Textarea
                  label={'Description'}
                  className="form-control form-textarea"
                  rows="3"
                  placeholder={'Lý do nạp tiền'}
                />
                <Input label={'Money'} type="number" placeholder={'100.000'} />
              </Form>
            </ModalBody>
            <ModalFooter>
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={this.closeModal.bind(this, 'modalAddMoney')}
                  data-modal={'modalAddMoney'}
                >
                  Close
                </button>
                <button type="button" className="btn btn-success">
                  Add Money
                </button>
              </React.Fragment>
            </ModalFooter>
          </React.Fragment>
        </Modals>
        {/*End modalAddMoney*/}
      </React.Fragment>
    )
  }
}
export default UserDetail
