[English](./README.md)  | 简体中文

# Omi Loader 是什么？
`omil`是一个 webpack 的 loader，它允许你以一种名为单文件组件`(SFCs)`的格式撰写 Omi 或者 Eno 组件：

```html
<template lang="html" name="component-name">
  <header onClick="${this.test}">${this.data.title}</header>
</template>
<script>
export default class {
  test(){ console.log('Hello Eno!') }
  install() {
    this.data = { title: 'Omi' }
  }
}
</script>
<style>
header {
  color: #58bc58;
}
</style>
```

Omil 还提供了很多酷炫的特性：

- 允许为 Omi 组件的每个部分使用其它的 webpack loader，例如在`<style>`的部分使用 Sass 和在`<template>`的部分使用 jsx；
- 允许在一个 .omi 文件中使用自定义块，并对其运用自定义的 loader 链；
- 使用 webpack loader 将`<style>`和`<template>`中引用的资源当作模块依赖来处理；
- 在开发过程中使用热重载来保持状态。

简而言之，webpack 和 Omi Loader 的结合为你提供了一个现代、灵活且极其强大的前端工作流，来帮助撰写 Omi.js 应用。

# 起步

## Omi CLI
如果你不想手动设置 webpack，我们推荐使用 [Omi CLI](https://github.com/Tencent/omi/tree/master/packages/omi-cli) 直接创建一个项目的脚手架。通过 Omi CLI 创建的项目会针对多数常见的开发需求进行预先配置，做到开箱即用。

如果`Omi CLI`提供的内建没有满足你的需求，或者你乐于从零开始创建你自己的 webpack 配置，那么请继续阅读这篇指南。

# 手动设置
## 安装

首先先安装好`Omil`
```bash
npm install -D omil
```
如果你使用的是 [Visual Studio Code](https://code.visualstudio.com/) 进行开发，强烈建议下载 [Omi Snippets](https://marketplace.visualstudio.com/items?itemName=Wscats.omi-snippets) 扩展，它会提供给你语法高亮，局部编译等功能。您可以在 VSC 扩展界面里面搜索 omi 这个关键词出现`Omi Snippets`点击安装即可，稍等片刻，当它安装成功后会提醒你需要重新加载编辑工具，点击重新加载即可使用。

<img src="./src/assets/omi-snippets.png">

每个`Omil`包的新版本发布时，一个相应版本的`Omi Snippets`也会随之发布。

## webpack 配置

Omi Loader 的配置和其它的 loader 基本一样。
```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.omi|eno$/,
        loader: 'omil'
      }
    ]
  }
}
```
一个更完整的 webpack 配置示例看起来像这样：
```js
module.exports = {
  mode: 'development',
  module: {
    rules: [{
      test: /\.omi|eno$/,
      use: [{
        loader: require.resolve('omil'),
        options: {
          // Use in development, You should remove in production
          sourceMaps: 'both',
          // Config babel plugins for async, await and other many features
          plugins: [
            [
              "@babel/plugin-transform-runtime",
              {
                "absoluteRuntime": false,
                "corejs": false,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
              }
            ]
          ]
        }
      }],
      // Or you can use eno-loader or omil directly
      // use: ['eno-loader']
      // use: ['omil']
    }]
  }
}
```