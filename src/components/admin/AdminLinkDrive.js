import React from 'react'
import LayoutSidebar from 'components/layout/LayoutSidebar'
import LayoutMain from 'components/layout/LayoutMain'
import LayoutPageHead from 'components/layout/LayoutPageHead'
class AdminLinkDrive extends React.Component {
  render() {
    return (
      <React.Fragment>
        <LayoutSidebar />
        <LayoutMain>
          <React.Fragment>
            <div className="col-sm-12">
              <LayoutPageHead title={'Add Link Google Drive'} />
            </div>
            <div className="col-sm-8">
              <form action="">
                <div className="form-group">
                  <label>Link Google Drive (Public)</label>
                  <input
                    type="url"
                    className="form-control"
                    name="contact_me_to_use_api_dont_do_this"
                    placeholder="Nhập Link Google Drive"
                    defaultValue="https://drive.google.com/file/d/0B7MB8rvfJ1jCQjIyOXliUV9OVW8/view?usp=sharing"
                  />
                </div>
                <blockquote>
                  <p>
                    <small className="form-text text-muted">
                      Only my link above will work, if you want to use your link
                      contact me for apikey.
                    </small>
                    <small className="form-text text-muted">
                      e.g: https://yourdrivepublic.google.com/xxx | 5
                    </small>
                  </p>
                  <p>
                    <small className="form-text text-muted">
                      With number 5 bla bla bla ...
                    </small>
                  </p>
                </blockquote>
                <hr />
                <div className="form-group">
                  <button className="btn btn-success" type="submit">
                    Create Stream Link
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
export default AdminLinkDrive
