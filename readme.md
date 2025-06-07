> 基于 uni-app 的现代化多端开发模板，支持微信小程序、H5 等平台。

# 项目简介

这是一个开箱即用的 uni-app 多端开发模板，集成了企业级开发所需的核心工具链：

- 跨平台支持：完整支持微信小程序、H5 及其他主流小程序平台

- 现代化工具链：内置 ESLint + Prettier + EditorConfig 代码规范体系

- UI 组件库：集成 ColorUI 组件库和 Tailwind CSS 工具库

- 状态管理：使用 Pinia 作为状态管理解决方案

- 网络请求：封装了统一的 request 网络请求库

- 高效开发：配置了 VS Code 开发环境优化

# 环境要求
确保您的开发环境满足以下要求：

|软件/工具|	版本要求|
|--|--|
|Node.js|	v22.16.0|
|npm|	10.9.2|

推荐安装 VS Code 插件：

- EditorConfig for VS Code

- ESLint

- Prettier - Code formatter

- Vue Language Features (Volar)


# 主要技术栈以及版本

| 技术栈 | 版本 | 用途|
| --- | --- |---|
| uni-app | 3.0.0-4060420250429001 | 跨端开发框架 |
| Vue | ^3.4.21 | 前端框架 |
| Pinia | ^2.0.36 | 状态管理库 |
| Vue I18n | ^9.1.9 | 国际化解决方案 |
| Tailwind CSS | ^3.4.1 | 实用优先的 CSS 框架 |
| ColorUI | 手动集成 | 小程序 UI 组件库 |
| ESLint | ^8.57.0 | 代码质量检查 |
| Prettier | ^3.2.5 | 代码格式化工具 |
| Vite | 5.2.8 | 前端构建工具 |
| lodash-es | ^4.17.21 | 常用工具库 |
| dayjs | ^1.11.13 | 日期处理库 |


# 安装和运行

```
# 克隆项目到本地
git clone git@github.com:maturest/uni-app-template.git

# 配置环境变量 - 请根据实际情况修改
cp .env.development.example .env.development
cp .env.testing.example.env.testing
cp .env.production.example.env.production

# 安装项目依赖
npm install

# H5 开发环境运行
npm run dev:h5

# H5 测试环境运行
npm run dev:h5:testing

# H5 测试环境打包
npm run build:test

# H5 生产环境打包
npm run build:h5:testing

```

# 其他命令

Tailwind CSS 编译

```
# 单次编译
npm run tailwind:build

# 监听模式（开发时推荐）
npm run tailwind:watch
```

ESLint 检查

```
# 检查所有文件
npm run lint

# 修复所有可修复的问题
npm run lint:fix
```

Prettier 格式化

```
# 检查所有文件
npm run format
```

# 其他说明

- 项目根目录下的 .editorconfig 确保团队一致的编码风格。

- ESLint + Prettier 配置确保代码质量和一致性。
  - .eslintrc.js：配置了 Vue 3 和 uni-app 的检查规则

  - .prettierrc：定义了代码格式化规则

  - .eslintignore：指定忽略检查的文件/目录

- .vscode/settings.json 配置了自动修复和保存格式化。
