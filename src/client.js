import axios from 'axios'

class Client {
  constructor(opt = {}) {
    this.opt = Object.assign(this._getDefaultOption(), opt)
    this.request = axios.create(this.opt)
  }

  _getDefaultOption() {
    return {
      timeout: 3000
    }
  }

  _reset() {
    this.request = axios.create(this._getDefaultOption())
  }

  _update(opt) {
    this.request = axios.create(Object.assign(this.opt, opt))
  }

  addTokenToHeader(token) {
    this._update({
      headers: {
        'X-Token': token
      }
    })
  }

  removeToken() {
    if (this.opt.headers && this.opt.headers['X-Token']) {
      delete this.opt.headers['X-Token']
    }

    this._update(this.opt)
  }

  updateToken(token) {
    this.addTokenToHeader(token)
  }

  login({ email, password }) {
    return this.api('/login', 'post', { email, password }).then(res => {
      this.updateToken(res.data.access_token)
      return res
    })
  }

  logout() {
    return this.api('/logout', 'get').then(res => {
      this._reset()
      return res
    })
  }

  // call api endpoint
  api(path, method = 'get', params = {}) {
    return new window.Promise((resolve, reject) => {
      if (!path) {
        // path is required
        return reject(new Error('Used: api(path, method, params)'))
      }

      // add '/' to path if missing
      if (path[0] !== '/') {
        path = '/' + path
      }

      // use v1 version
      path = process.env.REACT_APP_API_URL + path
      if (path.indexOf('?') !== -1) {
        path += '&_t=' + Date.now()
      } else {
        path += '?_t=' + Date.now()
      }

      // support shorthand api(path, params)
      // method will default to get
      if (arguments.length === 2 && String(method) === '[object Object]') {
        params = method
        method = 'get'
      }

      method = method.toLowerCase()
      if (['get', 'post', 'put', 'delete'].indexOf(method) === -1) {
        return reject(
          new Error(
            `ERR: ${method} not allowed, only allow get, post, put, delete`
          )
        )
      }
      /*eslint no-unexpected-multiline: 0*/
      this.request[method.toLowerCase()](path, params)
        .then(resolve)
        .catch(reject)
    })
  }
}

export default new Client()
