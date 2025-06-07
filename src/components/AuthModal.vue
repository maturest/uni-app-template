<template>
  <view v-if="visible" class="cu-modal bottom-modal" @tap="close">
    <view class="cu-dialog" @tap.stop="">
      <!-- 模态框头部 -->
      <view class="cu-bar bg-gradual-blue justify-end">
        <view class="content text-white">授权提示</view>
        <view class="action" @tap="close">
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
          <button class="cu-btn bg-gray lg round margin-right" @click="close">拒绝</button>
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
  .cu-modal.bottom-modal {
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
</style>
