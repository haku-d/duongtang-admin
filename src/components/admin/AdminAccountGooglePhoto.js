import React from 'react'
import LayoutSidebar from 'components/layout/LayoutSidebar'
import LayoutMain from 'components/layout/LayoutMain'
import LayoutPageHead from 'components/layout/LayoutPageHead'
import {
  Modals,
  ModalHead,
  ModalBody,
  ModalFooter
} from 'components/modals/Modal'

// Get Data Demo
import getDate from 'locals/data-google-photo.json'
import AdminItem from 'components/admin/AdminItem'

class AccountGooglePhoto extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getDefaultState()
  }
  getDefaultState = () => ({
    modalVideo: false
  })
  // closeModal
  closeModal = (prTarget, e) => {
    let targetModal = e.target
    if (targetModal.getAttribute('data-modal') === prTarget) {
      this.setState({
        [prTarget]: false
      })
    }
  }
  render() {
    return (
      <React.Fragment>
        <Modals
          modalSize={'modal-dialog modal-lg'}
          modalShow={this.state.modalVideo}
          closeModal={this.closeModal.bind(this, 'modalVideo')}
          targetState={'modalVideo'}
        >
          <React.Fragment>
            <ModalHead
              closeModal={this.closeModal.bind(this, 'modalVideo')}
              targetState={'modalVideo'}
            >
              <h3 className="modal-title">Hello</h3>
            </ModalHead>
            <ModalBody>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id,
                fugit sapiente. Quisquam quam nostrum quae delectus quaerat sed
                dignissimos adipisci eius dicta, cupiditate error at velit, iure
                incidunt alias autem!
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                type="button"
                className="btn btn-default"
                onClick={this.closeModal.bind(this, 'modalVideo')}
                data-modal={'modalVideo'}
              >
                Close
              </button>
            </ModalFooter>
          </React.Fragment>
        </Modals>
        <LayoutSidebar />
        <LayoutMain>
          <React.Fragment>
            <div className="col-sm-12">
              <LayoutPageHead title={'Add Account Google Photo'} />
            </div>
            <div className="col-sm-6">
              <div className="list-group list-group-link">
                {getDate.data.AccountPhoto.map(item => (
                  <AdminItem
                    view={''}
                    key={item.id}
                    email={item.email}
                    edittarget={String(item.id)}
                  />
                ))}
              </div>
              <hr />
              <form action="">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name=""
                    type="email"
                    placeholder="Email"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Cookie
                    <button
                      type="button"
                      className="btn btn-link green"
                      onClick={() =>
                        this.setState({
                          modalVideo: true
                        })
                      }
                    >
                      <small>(What are Cookies?)</small>
                    </button>
                  </label>
                  <textarea
                    className="form-control form-textarea"
                    rows="3"
                    defaultValue=""
                  />
                </div>
                <div className="form-group">
                  <label className="">
                    <input type="checkbox" />{' '}
                    <small>Are you want to clone this is account?</small>
                  </label>
                </div>
                <hr />
                <div className="form-group">
                  <button className="btn btn-success btn-min-width">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </React.Fragment>
        </LayoutMain>
      </React.Fragment>
    )
  }
}
export default AccountGooglePhoto
