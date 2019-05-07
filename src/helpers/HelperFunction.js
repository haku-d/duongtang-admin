const HelperFunction = {
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

export default HelperFunction
