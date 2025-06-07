<template>
  <view class="min-h-screen bg-gradual-blue flex flex-direction items-center justify-center p-8">
    <!-- 主标题 -->
    <text class="text-white text-xxl font-bold mb-4">立即生成专属报告</text>

    <!-- 描述文字 -->
    <text class="text-white text-lg mb-8">输入手机号即可获取个性化分析报告</text>

    <!-- 手机号输入框 -->
    <view class="cu-form-group bg-white rounded-lg w-full mb-6">
      <input v-model="phoneNumber" type="number" placeholder="请输入手机号码" class="text-df" />
    </view>

    <!-- 提交按钮 -->
    <button class="cu-btn bg-green lg round shadow" @click="getUserProfile">
      <text class="text-white text-lg">立即生成</text>
    </button>

    <!-- 添加模态框组件 -->
    <AuthModal :visible="showModal" @close="showModal = false" @confirm="handleAuthConfirm" />
  </view>
</template>
<script>
  import AuthModal from '@/components/AuthModal.vue'
  export default {
    components: {
      AuthModal
    },
    data() {
      return {
        showModal: false,
        phoneNumber: ''
      }
    },
    computed: {
      phoneNumberValid() {
        return /^1[3-9]\d{9}$/.test(this.phoneNumber)
      }
    },
    methods: {
      getUserProfile() {
        this.showModal = true
      },
      handleAuthConfirm() {
        this.showModal = false
        this.getUserProfile()
      },
      submitPhone(userInfo) {
        // 这里添加实际提交逻辑，可以访问userInfo.nickName和userInfo.avatarUrl
        console.log('提交数据:', {
          phone: this.phoneNumber,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        })
      }
    }
  }
</script>

<style>
  /* 使用ColorUI和Tailwind的混合样式 */
  .cu-btn.lg {
    padding: 0 40px;
    height: 80rpx;
    line-height: 80rpx;
  }
</style>
