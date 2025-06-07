class RestClient {
  constructor(headers = {}) {
    this.headers = {
      'Content-Type': 'application/json',
      ...headers
    }
    this.baseUrl = this.getBaseUrlByEnv()
  }

  getBaseUrlByEnv() {
    // 优先使用.env中配置的VUE_APP_BASE_URL
    if (process.env.VUE_APP_BASE_URL) {
      return process.env.VUE_APP_BASE_URL
    }

    // 默认回退逻辑
    const env = process.env.NODE_ENV || 'development'
    switch (env) {
      case 'production':
        return 'https://customer.com'
      case 'test':
        return 'https://customer.test'
      default:
        return 'https://customer.dev'
    }
  }

  async request(method, url, data = {}, params = {}, needToken = false) {
    if (needToken) {
      const token = ''
      this.headers.Authorization = `Bearer ${token}`
    }

    return new Promise((resolve, reject) => {
      const headers = {
        ...this.headers
      }

      uni.request({
        url: `${this.baseUrl}${url}`,
        method: method.toUpperCase(),
        data,
        params,
        header: headers,
        success: res => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data)
          } else {
            reject(this.handleError(res))
          }
        },
        fail: err => {
          reject(this.handleError(err))
        }
      })
    })
  }

  handleError(error) {
    // 统一错误处理
    console.error('Request error:', error)
    return {
      status: error.statusCode || 500,
      message: error.errMsg || 'Network Error',
      data: error.data || null
    }
  }

  get(url, params = {}, needToken = false) {
    return this.request('GET', url, {}, params, needToken)
  }

  post(url, data = {}, needToken = false) {
    return this.request('POST', url, data, {}, needToken)
  }

  put(url, data = {}, needToken = false) {
    return this.request('PUT', url, data, {}, needToken)
  }

  patch(url, data = {}, needToken = false) {
    return this.request('PATCH', url, data, {}, needToken)
  }

  delete(url, params = {}, needToken = false) {
    return this.request('DELETE', url, {}, params, needToken)
  }

  setHeader(key, value) {
    this.headers[key] = value
    return this
  }

  setBaseUrl(url) {
    this.baseUrl = url
    return this
  }
}

// 创建默认实例
const restClient = new RestClient()

export default restClient
