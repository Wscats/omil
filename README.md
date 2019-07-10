[English](./README.md)  | 简体中文

# Omil 是什么？
`omil`是一个 webpack 的 loader，它允许你以一种名为单文件组件`(SFCs)`的格式撰写 Omi 组件：

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
header { color: #58bc58; }
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

# Omi Snippets

在配置完 Omil 之后，我们可以在 VSC 上同时安装好 [Omi Snippets](https://marketplace.visualstudio.com/items?itemName=Wscats.omi-snippets) 扩展，这个插件可以方便的让你把 .omi 和 .eno 后缀文件转化为 .js 文件，让你可以直观了解到单文件组件经过 omil 转化后的 JS 文件内容。

## 目录结构

例如你在 webpack 的入口文件夹中有一个 .omi 的后缀文件，当你新建并经过编辑保存之后，Omi Snippets扩展会在同级目录下新建一份同名但不同后缀的 .js 文件

- src
  - Hello.omi
  - Hello.js

|Hello.omi|开发中你需要编写的单文件组件|
|-|-|
|Hello.js|修改或者保存文件`Hello.omi`后经过插件转化的js文件|

如下图，左边的代码是我们编写的 .omi 后缀的单文件组件，右边是经过 Omi Snippets 生成的 .js 后缀文件。

<img src="./src/assets/transfer.png" />


## 示例代码

上图的示例代码如下

- `<template>` 标签负责放 JSX 的内容，属性`name="my-test"`为该组件的名字，后面可以在 JSX 中用`<my-text>`使用该组件;
- `<script>` 标签负责放入组件的逻辑文件，固定的结构为 `export default class { // 你的代码 }`或者为`export default HOC(class { // 你的代码 })`两种形式，第一种是定义类组件，第二种用来定义高阶组件，你的代码部分可以放入生命周期，函数等;
- `<style>` 标签负责定义该组件的局部样式

```html
<template name="my-test">
  <div class="example">
    { this.data.msg }
  </div>
</template>

<script>
export default class {
  install () {
    this.data = {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>
```
以下代码就是经过 Omi Snippets 生成的 .js 后缀文件，可以用于在你没有 omil 模块下，主逻辑文件或者其他组件引入调用。
```js
import { WeElement, define, h } from "omi";
class MyTest extends WeElement {
  render() {
    return h(
      "div",
      {
        class: "example"
      },
      this.data.msg
    );
  }
  install() {
    this.data = {
      msg: "Hello world!"
    };
  }
}
MyTest.css = `
.example {
  color: red;
}
`;
define("my-test", MyTest);
```

# 语言块规范

## 简介

.omi 文件是一个自定义的文件类型，用类 HTML 语法描述一个 Omi 组件。每个 .omi 文件包含三种类型的顶级语言块 `<template>`、`<script>` 和 `<style>`:

```html
<template name="my-test">
  <div class="example">
    { this.data.msg }
  </div>
</template>

<script>
export default class {
  install () {
    this.data = {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>
```

Omil 会解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 ES Module，它的默认导出是一个 Omi.js 组件定义好的自定义标签对象。

Omil 支持使用非默认语言，比如 CSS 预处理器，预编译的 HTML 模版语言，通过设置语言块的 lang 属性。例如，你可以像下面这样使用 Sass 语法编写样式：

```html
<style lang="sass">
  /* write Sass! */
</style>
```

# 语言块

## `<template>`模板

每个 .omi 文件最多包含一个 `<template>` 块。

内容将被提取，如果是 JSX 会编译为函数片段，如果为 html 会编译为字符串，并最终注入到从`<script>`导出的组件 render 函数中。

### 属性`name = "xxx-xxx"`(Omi组件)

定义`name="xxx-xxx"`可以给组件定义一个名字，这个名字会自动调用 omi 框架的 `define('xxx-xxx', xxxXxx)` 方法来注册组件，你就可以在页面中用这个属性名`<xxx-xxx></xxx-xxx>`来使用该组件

**注意：** 
- name属性值是组件名要满足 omi 框架的组件名字定义规范，首字母不能用大写字母，并且中间必须有`-`字符;
- `<template>`模板中不能有`<script>`和`<style>`代码片段。

```html
<template name="my-test">
  <div class="example">
    { this.data.msg }
  </div>
</template>
```
在页面容器中如此使用
```html
<my-test/>
<my-test></my-test>
```

### 属性`name = "XxxXxx"`(React组件)

定义`name="XxxXxx"`可以给组件定义一个名字，这个名字会自动调用 React 框架的 `React.Component` 方法来定义类组件，你就可以在页面中用这个属性名`<XxxXxx></XxxXxx>`来使用该组件

**注意：** 
- name属性值是组件名要满足 React 框架的组件名字定义规范，首字母必须大写字母;
- `<template>`模板中不能有`<script>`和`<style>`代码片段。

```html
<template name="MyTest">
  <div class="example">
    { this.data.msg }
  </div>
</template>
```
在页面容器中如此使用
```html
<MyTest/>
<MyTest></MyTest>
```

### 属性`lang = "html"`(仅支持Omi)

默认情况下，我们的`<template>`模板是使用 JSX 语法，如果我们增加属性`lang = "html"`，就可以支持编写html格式的字符串模板，你可以使用 ES6 的语法来编写 html 模板`<div>${ this.data.msg }<div>`，Omil 和 Omi-Snippets 会自动帮你引入`Omi.html()`方法帮你在客户端进行处理，会有一定的性能损耗，一般情况下不建议使用。

```html
<template name="my-test" lang="html">
  <div class="example">
    ${ this.data.msg }
  </div>
</template>
```

## `<script>`脚本

每个 .omi 文件最多包含一个 `<script>` 块。

### 类组件

如果我们使用过 react 我们会了解到组件通常有两种定义方式，一种是函数组件，一种是类组件，Omil 默认是帮你创建类组件，我们在`export default class { // 你的代码 }`或者`module.exports = class { // 你的代码 }`片段中写入你的组件逻辑代码，

**注意：** 
- 定义类组件必须是`export default class { // 你的代码 }`这种写法，`class MyText {} ; export default MyText`这种写法不可以，因为 Omil 和 Omil Snippets 只识别连续的`export default class`这段字符串


|`export default class { // 你的代码 }`|可以|建议使用|
|-|-|-|
|`module.exports = class { // 你的代码 }`|可以|支持|
|`class MyText { // 你的代码 }`<br/>`export default MyText`|不可以|不支持|
|`class MyText { // 你的代码 }`<br/>`module.export = MyText`|不可以|不支持|

```html
<script>
export default class {
  install () {
    this.data = {
      msg: 'Hello world!'
    }
  }
}
</script>
```

### 高阶组件(仅支持React)

有时候我们可以使用高阶组件拓展组件本身的一些功能，高阶组件跟类组件一样，只支持下面规定的写法。

|`export default HOC(class { // 你的代码 })`|可以|建议使用|
|-|-|-|
|`module.exports = HOC(class { // 你的代码 })`|可以|支持|
|`class MyText { // 你的代码 }`<br/>`export default HOC(MyText)`|不可以|不支持|
|`class MyText { // 你的代码 }`<br/>`module.export = HOC(MyText)`|不可以|不支持|

```html
<script>
export default HOC(class {
  install () {
    this.data = {
      msg: 'Hello world!'
    }
  }
})
</script>
```
下面是一个高阶组件的详细参考例子
```html
<template name="MyTest">
    <div><p>{this.state.title}</p></div>
</template>
<script>
// 高阶函数
const HOC = (props) => {
    return (WraooedComponent) => {
        return class HOC extends WeElement {
            render() {
                return (<div><WraooedComponent name={{ ...this.props }} /></div>)
            }
        }
    }
}
export default HOC({
    age: 18
})(class {
    install () {
        this.data = {
            msg: 'Hello world!'
        }
    }
})
</script>
<style lang="scss">
p { color: #58bc58; }
</style>
```
或者你可以这样写
```html
<template name="MyTest">
    {HOC(<div><p>{this.state.title}</p></div>)}
</template>
<script>
// 高阶函数
const HOC = (props) => {
    return (WraooedComponent) => {
        return class HOC extends WeElement {
            render() {
                return (<div><WraooedComponent name={{ ...this.props }} /></div>)
            }
        }
    }
}
export default class {
    install () {
        this.data = {
            msg: 'Hello world!'
        }
    }
}
</script>
<style lang="scss">
p { color: #58bc58; }
</style>
```

### 属性`type="text/babel"`

通常情况下，你可以在代码中使用ES6的语法，甚至一些新特性，例如：`static`，某些情况下我们需要转化为ES5做兼容，我们可以添加属性`type="text/babel"`
```html
<script>
export default class {
  static name = 'Eno Yao'
  install () {
    this.data = {
      msg: 'Hello world!'
    }
  }
}
</script>
```

## `<style>`样式

一个 .omi 文件可以包含一个`<style>`标签。

`<style>`标签的样式本身具有局部样式的特性，这取决于 Omi 的设计是 Web Components，这有点类似于 Vue 的 scoped 属性。

```html
<style>
.example {
  color: red;
}
</style>
```

### 属性`lang = "scss"`

我们还可以使用`lang = "scss"`来书写 scss 样式，它会自动帮我们编译为 css 格式内容

```html
<style lang = "scss">
$color: red;
.example {
  color: $color;
}
</style>
```

# 语法高亮

建议使用 VS Code 配合 Omi Snippets （该扩展支持语法高亮）扩展开发 Omi 项目，当然你可以把 .omi 文件当作 HTML 对待。

# 注释

在语言块中使用该语言块对应的注释语法 (HTML、CSS、JavaScript 等)。

|JSX 注释语法|`{/* comment contents here */}`|
|-|-|
|HTML 注释语法|`<!-- comment contents here -->`|

# JSX 简介

观察下面这段代码模板：
```html
<template name="component-name">
  <header onClick={this.test}>{this.data.title}</header>
</template>
```
这个有趣的标签语法既不是字符串也不是 HTML。

它被称为 JSX，是一个 JavaScript 的语法扩展。我们建议在 Omi 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。

上面的代码事实上会自动编译为下面这份 js 代码
```js
import { WeElement, define, h } from "omi";
class ComponentName extends WeElement {
  render() {
    return h(
      "div",
      {
        onClick: this.testClick
      },
      this.data.title
    );
  }
}
define("component-name", ComponentName);
```

## 为什么使用 JSX？

Omi 和 React 不强制要求使用 JSX，但是大多数人发现，在 JavaScript 代码中将 JSX 和 UI 放在一起时，会在视觉上有辅助作用。

# Omi 和 React 在使用 Omil 和 Omi Snippets 的区别

Omil和Omi Snippets都支持编译Omi和React，编译的区别取决于`<template>`的`name`属性值，React的组件名必须首字母大写，Omi的组件首字母不能大写，并且名字中间必须有`-`符号连接。

|React|Omi|
|-|-|
|`<template name="ComponentName">`|`<template name="component-name">`|
|组件名必须首字母大写|组件首字母不能大写，并且名字中间必须有`-`符号连接|

## 在 JSX 中嵌入表达式

在下面的例子中，我们声明了一个名为 title 的变量，然后在 JSX 中使用它，并将它包裹在大括号中：
```html
<template name="component-name">
    <div>
        {this.data.title}
    </div>
</template>
<script>
    export default class {
        install() {
            this.data = {
                title: "Eno Yao !"
            }
        }
    }
</script>
```

在 JSX 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式。例如，2 + 2，user.firstName 或 formatName(user) 都是有效的 JavaScript 表达式。

```html
<template name="component-name">
    <div>
        <p>Name: {this.formatName(user)}</p>
        <p>Age: {9+9}</p>
    </div>
</template>
<script>
    const user = {
        firstName: 'Eno',
        lastName: 'Yao'
    };
    export default class {
        formatName(user) {
            return user.firstName + ' ' + user.lastName;
        }
    }
</script>
```

二元和三元表达式

```html
<template name="component-name">
    <div>
        { !0 ? '真' : <p>假</p> }
        <h1>{ user.age > 18 && <div>成年</div> }<h1></h1>
    </div>
</template>
```

数组渲染成列表
```html
<template name="component-name">
    <ul>
        {
            ['a','b','c'].map((item,index) => {
                return <li key={index}>{item}</li>
            })
        }
    </ul>
</template>
```


## JSX 也是一个表达式

在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。

也就是说，你可以在 if 语句和 for 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX：

```html
<template name="component-name">
    <div>
        <p>{this.getGreeting(user)}</p>
        <p>{this.getGreeting()}</p>
    </div>
</template>
<script>
    const user = {
        firstName: 'Eno',
        lastName: 'Yao'
    };
    export default class {
        formatName(user) {
            return user.firstName + ' ' + user.lastName;
        }
        getGreeting(user) {
            if (user) {
                return <h1>Hello, {this.formatName(user)}!</h1>;
            }
            return <h1>Hello, Stranger.</h1>;
        }
    }
</script>
```

## JSX 特定属性

你可以通过使用引号，来将属性值指定为字符串字面量
```html
<template name="component-name">
    <div tabIndex="0"></div>
</template>
```

也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：

```html
<template name="component-name">
    <div tabIndex="0">
        <img src={this.data.avatarUrl} />
    </div>
</template>
<script>
    export default class {
        install() {
            this.data = {
                avatarUrl: 'https://avatars1.githubusercontent.com/u/17243165?s=460&v=4'
            }
        }
    }
</script>
```

HTML 和 JSX 的一些区别

|HTML|JSX|
|-|-|
|`<div class>`|`<div className>`|
|`<label for>`|`<label htmlFor>`|
|`<div tabindex>`|`<div tabIndex>`|


在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号。你应该仅使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。

> 警告：

> 因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。

> 例如，JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。


## 使用 JSX 指定子元素

假如一个标签里面没有内容，你可以使用 `/>` 来闭合标签，就像 XML 语法一样：

```html
<img src={this.data.avatarUrl} />
<input onChange={this.getInputValue.bind(this)} />
```
JSX 标签里能够包含很多子元素:

```html
<template name="component-name">
    <div>{this.data.element}</div>
</template>
<script>
    export default class {
        install() {
            this.data = {
                element: (
                    <div>
                        <h1>Hello!</h1>
                        <h2>Good to see you here.</h2>
                    </div>
                )
            }
        }
    }
</script>
```

## JSX 表示对象

Babel 会把 JSX 转译成一个名为 `h()` 函数调用。

以下两种示例代码完全等效：
```js
const element = <div>
    <h1 className="greeting">
        Hello, world!
    </h1>
</div>
```
```js
const element = h(
  "div",
  null,
  h(
    "h1",
    {
      className: "greeting"
    },
    "Hello, world!"
  )
);
```

`h()` 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：

```js
// 注意：这是简化过的结构
const element = {
  children: [{
    attributes: {className: "greeting"},
    children: ["Hello, world!"],
    nodeName: "h1",
  }],
  nodeName: "div"
}
```

这些对象它们描述了你希望在屏幕上看到的内容。Omi 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。

