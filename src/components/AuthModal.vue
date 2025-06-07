<template>
  <view
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <view class="bg-white rounded-lg w-4/5 overflow-hidden">
      <!-- 模态框头部 -->
      <view class="bg-gradual-blue text-white p-4 flex justify-between items-center">
        <text class="text-lg font-bold">授权提示</text>
        <text class="cuIcon-close text-xl" @click="close"></text>
      </view>

      <!-- 模态框内容 -->
      <view class="p-6">
        <text class="text-gray-700 mb-6 block">需要获取您的头像和昵称信息用于生成个性化报告</text>

        <!-- 操作按钮 -->
        <view class="flex justify-between mt-4">
          <button class="cu-btn bg-gray lg round" @click="close">拒绝</button>
          <button class="cu-btn bg-green lg round" @click="confirm">同意授权</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      confirm() {
        this.$emit('confirm')
      }
    }
  }
</script>

<style>
  /* 使用ColorUI和Tailwind的混合样式 */
  .cu-btn.lg {
    padding: 0 30px;
    height: 80rpx;
    line-height: 80rpx;
  }
</style>
