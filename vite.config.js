import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss')(require('./tailwind.config.js')),
        require('autoprefixer'),
        require('postcss-rem-to-responsive-pixel')({
          rootValue: 32,
          propList: ['*'],
          transformUnit: 'rpx',
          exclude: file => file.includes('node_modules')
        })
      ]
    }
  }
})
