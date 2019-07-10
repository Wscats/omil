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