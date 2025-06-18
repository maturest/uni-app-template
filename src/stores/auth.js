import { defineStore } from 'pinia'
import restClient from '@/utils/request'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    isRefreshing: false,
    refreshQueue: []
  }),

  actions: {
    // 初始化认证状态
    init() {
      this.accessToken = uni.getStorageSync('accessToken')
      this.refreshToken = uni.getStorageSync('refreshToken')
      this.user = uni.getStorageSync('user')
    },

    // 保存令牌
    setTokens({ access_token, refresh_token }) {
      this.accessToken = access_token
      this.refreshToken = refresh_token

      uni.setStorageSync('accessToken', access_token)
      uni.setStorageSync('refreshToken', refresh_token)
    },

    // 设置用户信息
    setUser({ user }) {
      this.user = user
      uni.setStorageSync('user', user)
    },

    // 清除令牌
    clearTokens() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null

      uni.removeStorageSync('accessToken')
      uni.removeStorageSync('refreshToken')
    },

    // 登录
    async login(credentials) {
      try {
        const response = await restClient.post('login', credentials)
        const { data } = response
        this.setTokens(data)
        this.setUser(data)
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },

    // 刷新令牌
    async refreshToken() {
      if (!this.refreshToken) {
        this.clearTokens()
        throw new Error('No refresh token available')
      }

      // 如果正在刷新，返回队列中的Promise
      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.refreshQueue.push({ resolve, reject })
        })
      }

      this.isRefreshing = true

      try {
        const response = await restClient.post('refresh', {
          refresh_token: this.refreshToken
        })
        const { data } = response
        this.setTokens(data)
        this.setUser(data)
        // 处理队列中的请求
        this.refreshQueue.forEach(({ resolve }) => resolve())
        this.refreshQueue = []

        return data.access_token
      } catch (error) {
        console.error('Token refresh failed:', error)

        // 处理队列中的请求
        this.refreshQueue.forEach(({ reject }) => reject(error))
        this.refreshQueue = []

        this.clearTokens()
        throw error
      } finally {
        this.isRefreshing = false
      }
    },

    // 登出
    async logout() {
      try {
        await restClient.post('logout', {}, true)
      } finally {
        this.clearTokens()
      }
    }
  }
})
