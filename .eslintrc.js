module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    // 禁用 ESLint 的缩进规则，让 Prettier 完全控制缩进
    indent: 'off',

    // 禁用 Vue 相关的缩进规则
    'vue/html-indent': 'off',
    'vue/script-indent': 'off',
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
        printWidth: 100,
        tabWidth: 2, // 明确指定 Prettier 使用 2 空格
        useTabs: false
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
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/prettier',
    'plugin:prettier/recommended'
  ]
}
