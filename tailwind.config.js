/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './pages.json' // 包含 uni-app 的配置文件
  ],
  corePlugins: {
    // 禁用小程序不支持的样式功能
    preflight: false, // 禁用默认样式
    space: false,
    divideWidth: false,
    divideColor: false,
    divideStyle: false,
    divideOpacity: false
  },
  theme: {
    extend: {
      // 添加自定义主题
      colors: {
        primary: '#2979ff'
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)'
      }
    }
  },
  plugins: []
}
