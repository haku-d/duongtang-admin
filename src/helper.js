// format the err object return in axios reject promise
const helper = {
  formatError: err => {
    if (err.response && err.response.data && err.response.data.message) {
      return err.response.data.message
    }

    return 'Unknown Error !1!!'
  }
}

export default helper
