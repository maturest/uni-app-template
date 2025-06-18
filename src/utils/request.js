import { useAuthStore } from '@/stores/auth'

class RestClient {
  constructor(headers = {}) {
    this.headers = {
      'Content-Type': 'application/json',
      ...headers
    }
    this.baseUrl = this.getBaseUrlByEnv()
  }

  getBaseUrlByEnv() {
    // 默认回退逻辑
    const env = process.env.NODE_ENV || 'development'
    switch (env) {
      case 'production':
        return 'https://customer.com'
      case 'test':
        return 'https://customer.test'
      default:
        return 'http://calculate.test/api/v1/'
    }
  }

  async request(method, url, data = {}, params = {}, needToken = false) {
    const authStore = useAuthStore()
    // 初始化认证状态
    if (!authStore.accessToken) {
      authStore.init()
    }

    // 需要令牌的处理
    if (needToken) {
      return this._requestWithToken(method, url, data, params, authStore)
    }

    // 不需要令牌的普通请求
    return this._basicRequest(method, url, data, params)
  }

  async _requestWithToken(method, url, data, params, authStore) {
    try {
      // 第一次尝试请求
      return await this._makeRequest(method, url, data, params, authStore.accessToken)
    } catch (error) {
      // 401错误尝试刷新令牌
      if (error.status === 401 && authStore.refreshToken) {
        try {
          // 刷新令牌
          const newAccessToken = await authStore.refreshToken()

          // 使用新令牌重试请求
          return await this._makeRequest(method, url, data, params, newAccessToken)
        } catch (refreshError) {
          // 刷新失败处理
          if (refreshError.status === 401) {
            authStore.clearTokens()
            uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
            uni.reLaunch({ url: '/login/index' })
          }
          throw refreshError
        }
      }

      // 其他错误直接抛出
      throw error
    }
  }

  async _makeRequest(method, url, data, params, token) {
    const headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`
    }

    return new Promise((resolve, reject) => {
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

  async _basicRequest(method, url, data, params) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: `${this.baseUrl}${url}`,
        method: method.toUpperCase(),
        data,
        params,
        header: this.headers,
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
