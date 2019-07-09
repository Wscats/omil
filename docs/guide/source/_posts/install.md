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

<img src="../images/omi-snippets.png">

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