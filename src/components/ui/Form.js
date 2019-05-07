import React from 'react'

class Form extends React.Component {
  displaySuccessMsg() {
    if (this.props.isSuccess) {
      return <div className="alert alert-success">{this.props.msg}</div>
    }
  }

  displayErrorMsg() {
    if (this.props.isError) {
      return <div className="alert alert-danger">{this.props.msg}</div>
    }
  }

  render() {
    return (
      <form
        className={this.props.className}
        noValidate
        onSubmit={this.props.onSubmit}
      >
        {this.displaySuccessMsg()}
        {this.displayErrorMsg()}
        {this.props.children}
      </form>
    )
  }
}

Form.defaultProps = {
  className: ''
}

export default Form
