import axios from 'axios'

class Client {
  constructor(opt = {}) {
    this.opt = Object.assign(this._getDefaultOption(), opt)
    this.request = this._create()
  }

  _getDefaultOption() {
    return {
      timeout: 3000
    }
  }

  _reset() {
    this.request = axios.create(this._getDefaultOption())
  }

  _create(opt) {
    const request = axios.create(Object.assign(this.opt, opt))
    request.interceptors.response.use(this.handleUnauthorized.bind(this), this.handleError.bind(this))
    return request
  }

  handleUnauthorized(response) {
    if (response.data && response.data.status === 401) {
      // Should be redirected to logout page
      window.location.href = '/logout'
      return
    }

    return response
  }
  handleError(error) {}

  removeToken() {
    this.request.defaults.headers.common['X-Token'] = undefined;
  }

  updateToken(token) {
    this.request.defaults.headers.common['X-Token'] = token;
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

  get(path, params = {}) {
    return this.api(path, 'get', params)
  }

  post(path, data = {}) {
    return this.api(path, 'post', data)
  }
}

export default new Client()
