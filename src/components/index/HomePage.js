import React from 'react'
import Form from 'components/ui/Form'
import Input from 'components/ui/Input'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="main">
          <div className="container">
            <div className="row justify-content-center align-items-center home-pages">
              <div className="col-sm-12 text-center">
                <h1 className="main-color">
                  Get Stream Link From Google Drive
                </h1>
                <p>
                  Contact me at:{' '}
                  <Link to="https://www.facebook.com/quocnguyenclgt">
                    https://www.facebook.com/quocnguyenclgt
                  </Link>
                </p>
              </div>
              <div className="col-sm-3">
                {/*<img src="https://via.placeholder.com/200x300" alt="" />*/}
                Cho em xin cái ảnh với ...!
              </div>
              <div className="col-sm-9">
                <Form>
                  <Input
                    text="text"
                    label="Link Google Drive (Public)"
                    placeholder="https://drive.google.com/file/d/0B7MB8rvfJ1jCQjIyOXliUV9OVW8"
                  />
                  <p>
                    <small className="form-text text-muted">
                      Only my link above will work, if you want to use your link
                      contact me for apikey.
                    </small>
                  </p>
                  <button type="button" className="btn btn-success btn-block">
                    Create Stream Link
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
        { this.props.isLogged ? <Redirect to="/dashboard" /> : null }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.user.isLogged
  }
}

export default connect(
  mapStateToProps,
  null
)(HomePage)
