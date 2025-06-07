<template>
  <view class="page bg-gradual-blue flex flex-direction align-center justify-center padding-xl">
    <!-- 主标题 -->
    <text class="text-white text-xxl text-bold margin-bottom">立即生成专属报告</text>

    <!-- 描述文字 -->
    <text class="text-white text-lg margin-bottom-xl">输入手机号即可获取个性化分析报告</text>

    <!-- 手机号输入框 -->
    <view class="cu-form-group bg-white radius-lg margin-bottom">
      <input v-model="phoneNumber" type="number" placeholder="请输入手机号码" class="text-df" />
    </view>

    <!-- 提交按钮 -->
    <button class="cu-btn bg-green lg round shadow" @click="getUserProfile">
      <text class="text-white text-lg">立即生成</text>
    </button>

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
      async handleAuthConfirm() {
        this.showModal = false
        // 这里添加授权确认后的逻辑
        // ... existing getUserProfile code ...
      },
      submitPhone(userInfo) {
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
  .page {
    min-height: 100vh;
  }
</style>
