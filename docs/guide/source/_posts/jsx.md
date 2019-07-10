# JSX 简介

观察下面这段代码模板：
```html
<template name="my-test">
  <header onClick={this.test}>{this.data.title}</header>
</template>
```
这个有趣的标签语法既不是字符串也不是 HTML。

它被称为 JSX，是一个 JavaScript 的语法扩展。我们建议在 Omi 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。

上面的代码事实上会自动编译为下面这份 js 代码
```js
import { WeElement, define, h } from "omi";
class MyTest extends WeElement {
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
define("my-test", MyTest);
```

## 为什么使用 JSX？

Omi 不强制要求使用 JSX，但是大多数人发现，在 JavaScript 代码中将 JSX 和 UI 放在一起时，会在视觉上有辅助作用。
