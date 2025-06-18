<template>
  <view class="container">
    <button class="login-btn" open-type="getPhoneNumber" @getphonenumber="bindPhoneNumber">
      手机号快速验证
    </button>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { onLoad } from '@dcloudio/uni-app'
  import restClient from '@/utils/request'

  const authStore = useAuthStore()

  const bindPhoneNumber = async e => {
    try {
      console.log('获取到的手机号信息:', e.detail)

      if (!e.detail.code) {
        throw new Error('未获取到有效的code')
      }

      const res = await restClient.post(
        'bindPhoneNumber',
        {
          code: e.detail.code
        },
        true
      )
      console.log('绑定手机号接口返回数据:', res)
      if (res.data.success) {
        console.log('手机号绑定成功:', res.data)
        // 绑定成功后的处理逻辑
      } else {
        console.error('手机号绑定失败:', res.data.message)
        // 绑定失败后的处理逻辑
      }
    } catch (error) {
      console.error('绑定手机号过程中出错:', error)
      // 错误处理逻辑
    }
  }

  const weixinMiniLogin = () => {
    uni.login({
      provider: 'weixin',
      success: async res => {
        const credentials = {
          code: res.code
        }
        await authStore.login(credentials)
      }
    })
  }

  onLoad(() => {
    // 获取 useAuthStore 中的 accessToken
    const accessToken = authStore.accessToken
    if (!accessToken) {
      // 调用方法 weixinMiniLogin 进行登录
      weixinMiniLogin()
    }
  })
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .login-btn {
    padding: 15px 30px;
    background-color: #07c160;
    color: white;
    border-radius: 5px;
  }
</style>
