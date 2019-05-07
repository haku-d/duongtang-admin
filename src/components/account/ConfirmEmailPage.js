import React from 'react'
class ConfirmEmailPage extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="container">
          <div className="row justify-content-center align-items-center sign">
            <div className="col-sm-8 text-center">
              <h1 className="main-color mg-bt-20">
                Thank you for createing account!
              </h1>
              <p>
                We've sent you an email. Complete the process of creating your
                account by clicking the link in that email.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ConfirmEmailPage
