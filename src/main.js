import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from '@/store' // 导入创建的 pinia 实例

export function createApp() {
  const app = createSSRApp(App)

  // 挂载 Pinia
  app.use(pinia)

  // 添加小程序端状态更新监听
  if (typeof uni !== 'undefined') {
    uni.$on('pinia-store-update', storeId => {
      try {
        // 获取当前页面栈
        const pageStack = getCurrentPages()

        // 确保有页面且不是首页
        if (!pageStack.length) return

        const currentPage = pageStack[pageStack.length - 1]

        // 检查当前页面和组件实例
        if (!currentPage?.$vm) return

        // 使用微任务队列确保在视图更新后执行
        Promise.resolve().then(() => {
          currentPage.$vm.$forceUpdate()
          console.log(`强制更新页面: ${currentPage.route}, 触发store: ${storeId}`)
        })
      } catch (error) {
        console.error('pinia-store-update 监听器错误:', error)
      }
    })
  }

  return {
    app
  }
}
