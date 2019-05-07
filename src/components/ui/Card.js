import React from 'react'
import PropTypes from 'prop-types'
class Card extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className={this.props.addClass}>
          <div className="card-body">
            <h2 className="card-title">{this.props.title}</h2>
            <span className="card-number">{this.props.number}</span>
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
  number: PropTypes.number.isRequired
}
// Default propTypes
Card.defaultProps = {
  addClass: 'card',
  title: '',
  number: 0
}
export default Card
