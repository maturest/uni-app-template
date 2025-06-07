<script>
  export default {
    onLaunch: function () {
      uni.getSystemInfo({
        success: function (e) {
          // #ifndef MP
          this.StatusBar = e.statusBarHeight
          if (e.platform == 'android') {
            this.CustomBar = e.statusBarHeight + 50
          } else {
            this.CustomBar = e.statusBarHeight + 45
          }
          // #endif
          // #ifdef MP-WEIXIN
          this.StatusBar = e.statusBarHeight
          let custom = wx.getMenuButtonBoundingClientRect()
          this.Custom = custom
          this.CustomBar = custom.bottom + custom.top - e.statusBarHeight
          // #endif
          // #ifdef MP-ALIPAY
          this.StatusBar = e.statusBarHeight
          this.CustomBar = e.statusBarHeight + e.titleBarHeight
          // #endif
        }.bind(this)
      })
    },
    onShow: function () {
      console.log('App Show')
    },
    onHide: function () {
      console.log('App Hide')
    }
  }
</script>

<style>
  @import 'colorui/main.css';
  @import 'colorui/icon.css';

  /* 引入 Tailwind */
  @import './styles/tailwind.css';

  /* 全局样式 */
  page {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
