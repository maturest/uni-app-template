import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建 Pinia 实例
const pinia = createPinia()

// // 添加持久化插件
// pinia.use(piniaPluginPersistedstate)

// // uni-app 小程序兼容性适配
// pinia.use(({ store }) => {
//   // 保存初始状态用于重置
//   const initialState = JSON.parse(JSON.stringify(store.$state))
//   store.$reset = () => store.$patch(initialState)

//   // 订阅状态变化，确保小程序端更新
//   store.$subscribe(() => {
//     if (typeof uni !== 'undefined' && uni.$emit) {
//       uni.$emit('pinia-store-update', store.$id)
//     }
//   })
// })

export default pinia
