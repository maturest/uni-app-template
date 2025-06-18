import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from '@/stores'
import restClient from './utils/request.js'
import { useAuthStore } from '@/stores/auth'

export function createApp() {
  const app = createSSRApp(App)
  // 挂载到全局
  app.config.globalProperties.$http = restClient

  // 挂载 Pinia
  app.use(pinia)

  // 初始化认证状态
  const authStore = useAuthStore()
  authStore.init()

  // 添加小程序端状态更新监听
  // if (typeof uni !== 'undefined') {
  //   uni.$on('pinia-store-update', storeId => {
  //     try {
  //       // 获取当前页面栈
  //       const pageStack = getCurrentPages()

  //       // 确保有页面且不是首页
  //       if (!pageStack.length) return

  //       const currentPage = pageStack[pageStack.length - 1]

  //       // 检查当前页面和组件实例
  //       if (!currentPage?.$vm) return

  //       // 使用微任务队列确保在视图更新后执行
  //       Promise.resolve().then(() => {
  //         currentPage.$vm.$forceUpdate()
  //         console.log(`强制更新页面: ${currentPage.route}, 触发store: ${storeId}`)
  //       })
  //     } catch (error) {
  //       console.error('pinia-store-update 监听器错误:', error)
  //     }
  //   })
  // }

  return {
    app
  }
}
