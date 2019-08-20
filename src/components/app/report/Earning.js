import React from 'react'
import { connect } from 'react-redux'

import { Line } from 'react-chartjs-2'

import Main from 'components/common/ui/Main'
import Header from 'components/common/ui/Header'

import { getWeeklyEarning } from 'reducers/ReportReducer'

class ReportEarning extends React.Component {
  state = {
    days: 7
  }

  componentDidMount() {
    this.props.getWeeklyEarning()
  }

  handleDayRangeChange(days) {
    this.setState({
      days: days
    })
    this.props.getWeeklyEarning(days)
  }

  renderEarningChart() {
    const data = {
      labels: this.props.earnings.data_labels,
      datasets: [
        {
          label: 'Earnings',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.earnings.data_values.total_earn
        }
      ]
    }
    return <Line data={data} />
  }
  renderRequestChart() {
    const data = {
      labels: this.props.earnings.data_labels,
      datasets: [
        {
          label: 'Total view',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(255,224,230,0.4)',
          borderColor: 'rgba(255,224,230,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.earnings.data_values.total_view
        },
        {
          label: 'Total upload',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(255,236,218,0.4)',
          borderColor: 'rgba(255,236,218,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.earnings.data_values.total_upload
        },
        {
          label: 'Total export',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(219,242,242,0.4)',
          borderColor: 'rgba(219,242,242,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.earnings.data_values.total_export
        }
      ]
    }
    return <Line data={data} />
  }

  render() {
    return (
      <Main>
        <Header title={'Report Earnings'} />
        <div className="row">
          <div className="col-sm-12">
            <button
              disabled={this.state.days === 7}
              onClick={() => this.handleDayRangeChange(7)}
            >
              7 days
            </button>
            <button
              disabled={this.state.days === 14}
              onClick={() => this.handleDayRangeChange(14)}
            >
              14 days
            </button>
            <button
              disabled={this.state.days === 30}
              onClick={() => this.handleDayRangeChange(30)}
            >
              30 days
            </button>
          </div>
          <div className="col-sm-12">{this.renderEarningChart()}</div>
          <div className="col-sm-12">{this.renderRequestChart()}</div>
        </div>
      </Main>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.report
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getWeeklyEarning: days => dispatch(getWeeklyEarning(days))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportEarning)
