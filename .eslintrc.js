module.exports = {
    root: true,
    env: {
      node: true,
      browser: true,
      es2021: true
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      '@vue/prettier'
    ],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    rules: {
      // Vue 规则
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      
      // JavaScript 规则
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': 'warn',
      
      // Prettier 集成
      'prettier/prettier': [
        'warn',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'none',
          printWidth: 100
        }
      ]
    },
    globals: {
      // uni-app 全局对象
      uni: true,
      wx: true,
      getApp: true,
      getCurrentPages: true,
      Page: true,
      Component: true
    }
  }