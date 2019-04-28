# Install

> Webpack loader for Omi Single-File Components

You can use [npm](https://www.npmjs.com/package/eno-loader) install or [git](https://github.com/Wscats/eno-loader) clone it
```bash
npm install eno-loader --save-dev
```

## What is Eno Loader?

`eno-loader` is a loader for [webpack](https://webpack.js.org/) that allows you to author Omi components in a format called Single-File Components

```html
<template lang="html">
  <!-- replace render function -->
  <header onClick="${this.test}">${this.data.title}</header>
</template>
<script>
import style from './_oHeader.css'
export default {
  css() {
    return style // it will combine scoped css
  }
  test(){
    console.log('Hello Eno!')
  }
  install() {
    this.data = {
      title: 'Omi'
    }
  }
}
</script>
<style>
/* scoped css */
header {
  height: 50px;
  background-color: #07c160;
  color: white;
  text-align: center;
  line-height: 50px;
  width: 100%;
}
</style>
```

it also support jsx, when you use jsx, you can write `<template>` without `lang="html"` attribute

```html
<template>
  <header onClick={this.test}>{this.data.title}</header>
</template>
```

There are many cool features provided by `eno-loader`:

- Allows using other webpack loaders for each part of a Omi component, for example Sass for `<style lang="scss">` and JSX/HTML for `<template lang="html">`;
- Allows custom blocks in a `.omi` or `.eno` file that can have custom loader chains applied to them [Here Online Demo](https://github.com/Wscats/eno-loader/tree/master/src/components);
- Treat static assets referenced in `<style>` and `<template>` as module dependencies and handle them with webpack loaders (Such as [htm](https://www.npmjs.com/package/htm), [to-string-loader](https://www.npmjs.com/package/to-string-loader));
- Simulate scoped CSS for each component (Use Shadow DOM);
- State-preserving hot-reloading during development.

In a nutshell, the combination of webpack and `eno-loader` gives you a modern, flexible and extremely powerful front-end workflow for authoring Omi.js applications.
