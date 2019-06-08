import React from 'react'

class Textarea extends React.Component {
  displayLabel() {
    if (this.props.label) {
      return <label htmlFor={this.props.id}>{this.props.label}</label>
    }
  }

  displayInvalid() {
    let isInvalid = 'form-control'
    if (this.props.help) {
      isInvalid = 'form-control is-invalid'
    }
    return isInvalid
  }

  displayHelp() {
    if (this.props.help) {
      return <small className="form-text">{this.props.help}</small>
    }
  }
  render() {
    return (
      <div className="form-group">
        {this.displayLabel()}
        <textarea
          id={this.props.id}
          className={this.displayInvalid()}
          placeholder={this.props.placeholder || ''}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
        {this.displayHelp()}
      </div>
    )
  }
}

Textarea.defaultProps = {
  isClassName: 'form-control'
}

export default Textarea
