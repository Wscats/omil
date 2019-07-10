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