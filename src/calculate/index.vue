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
    <button class="cu-btn bg-green lg round shadow" @click="generateReport">
      <text class="text-white text-lg">立即生成</text>
    </button>

    <view class="cu-modal bottom-modal" :class="modalName == 'authModal' ? 'show' : ''">
      <view class="cu-dialog">
        <!-- 模态框头部 -->
        <view class="cu-bar bg-gradual-blue justify-end">
          <view class="content text-white">授权提示</view>
          <view class="action" @tap="closeAuthModal">
            <text class="cuIcon-close text-white"></text>
          </view>
        </view>

        <!-- 模态框内容 -->
        <view class="padding-xl">
          <text class="text-gray text-df block margin-bottom-xl">
            需要获取您的头像和昵称信息用于生成个性化报告
          </text>

          <!-- 操作按钮 -->
          <view class="flex justify-between">
            <button class="cu-btn bg-gray lg round margin-right" @click="closeAuthModal">
              拒绝
            </button>
            <button class="cu-btn bg-green lg round" @click="confirmAuthModal">同意授权</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        modalName: '',
        phoneNumber: ''
      }
    },
    computed: {
      phoneNumberValid() {
        return /^1[3-9]\d{9}$/.test(this.phoneNumber)
      }
    },
    methods: {
      generateReport() {},
      closeAuthModal() {
        this.modalName = ''
      },
      confirmAuthModal() {},
      getUserProfile() {
        this.modalName = 'authModal'
      },
      submitPhone() {}
    }
  }
</script>

<style>
  .page {
    min-height: 100vh;
  }
</style>
