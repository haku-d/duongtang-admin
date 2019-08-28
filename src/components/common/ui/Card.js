import React from 'react'
import PropTypes from 'prop-types'
class Card extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className={this.props.addClass}>
          <div className="card-body">
            <h2 className="card-title">{this.props.title}</h2>
            <span className="card-number-body">{this.props.numberBody}</span>
            {this.props.icon}
          </div>
          <div className="card-footer">
            <span className="card-number-foo">{this.props.numberFoo}</span>
            <span className="card-point">{this.props.point}</span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
// Validator values props
Card.propTypes = {
  addClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  numberBody: PropTypes.any
}
// Default propTypes
Card.defaultProps = {
  addClass: 'card',
  title: '',
  numberBody: null,
  icon: null,
  point: 'gạo'
}
export default Card
