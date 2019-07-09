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

