module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-rem-to-responsive-pixel': {
      rootValue: 32, // 1rem = 32rpx
      propList: ['*'], // 所有属性都转换
      transformUnit: 'rpx', // 转换为 rpx 单位
      // 添加 exclude 规则，避免转换特定文件
      exclude: file => file.includes('node_modules')
    }
  }
}
