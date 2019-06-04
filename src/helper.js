// format the err object return in axios reject promise
const helper = {
  formatError: err => {
    if (err.response && err.response.data && err.response.data.message) {
      return err.response.data.message
    }

    return 'Unknown Error !1!!'
  },
  checkNumberZero: prNum => {
    if (prNum === 0) {
      return 'badge badge-secondary'
    }
    return ''
  },
  checkBadge: prBadge => {
    if (prBadge === 'Died') {
      return 'badge badge-secondary'
    }
    return ''
  },
  checkNumberMax: prNum => {
    if (Number(prNum) > 999) {
      return prNum.toLocaleString('it-IT')
    }
    return prNum
  }
}

export default helper
