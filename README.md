English | [简体中文](./README.CN.md) 

# Install

> Webpack loader for Omi Single-File Components

You can use [npm](https://www.npmjs.com/package/omil) install or [git](https://github.com/Wscats/omil) clone it.
```bash
npm install omil --save-dev
# or
npm install eno-loader --save-dev
```
Configuration webpack file like this:
```js
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
```
> [Loader Demo](https://wscats.github.io/omil/dist)

## Why Omil Or Eno Loader?

`omil` is a loader for [webpack](https://webpack.js.org/) that allows you to author Omi components in a format called Single-File Components.

## Usage In Omi

A `*.omi` file is a custom file format that uses HTML-like syntax to describe a Omi component. Each `*.omi` file consists of three types of top-level language blocks: `<template>, <script>, and <style>`, and optionally additional custom blocks:

```html
<template lang="html" name="component-name">
  <!-- replace render function -->
  <header onClick="${this.test}">${this.data.title}</header>
</template>
<script>
import style from './_oHeader.css'
export default class {
  static css = style + `p{color:red}` // it will combine scoped css，only support static css = xxx
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
> [Single-File Components Demo](https://github.com/Wscats/omil/blob/master/src/components/oHeader.omi)

It also supports [JSX](https://github.com/facebook/jsx), if you want to do that, you only write `<template>` without `lang="html"` attribute in your component like this:
```html
<template>
  <header onClick={this.test}>{this.data.title}</header>
</template>
```
> [JSX Demo](https://github.com/Wscats/omil/blob/master/src/components/oPanel.omi)

`omil` supports using non-default languages, such as CSS pre-processors and compile-to-HTML template languages, by specifying the lang attribute for a language block. For example, you install [node-sass](https://www.npmjs.com/package/node-sass) after you can use [Sass](https://sass-lang.com/) for the style of your component like this:
```html
<style lang="scss">
$height: 50px;
$color: #07c160;
header {
  height: $height;
  background-color: $color;
}
</style>
```

> [Sass Demo](https://github.com/Wscats/omil/blob/master/src/components/oGallery.omi)

## Support React

You can also use an ES6 class to define a class component by omil.
```html
<template name="ComponentName">
    <p>{this.state.title}</p>
</template>
<script>
    export default class {
        constructor(props) {
            super(props)
            this.state.title = "Eno Yao"
        }
    }
</script>
<style lang="scss">
    p {color: #58bc58;}
</style>
```

A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API. Here's a concrete example.
```html
<template name="ComponentName">
    <div>
        <p>{this.state.title}</p>
    </div>
</template>
<script>
    const HOC = (props) => {
        return (WraooedComponent) => {
            return class HOC extends WeElement {
                state = {
                    name: 'Eno Yao',
                    ...props
                }
                render() {
                    return (
                        <div>
                            Hello World
                            <WraooedComponent name={{ ...this.state }} />
                        </div>
                    )
                }
            }
        }
    }
    export default HOC({
        age: 18
    })(class {
        constructor(props) {
            super(props)
            this.state = {
                title: 'Lemon'
            }
        }
        componentDidMount() {
            console.log(this)
        }
        handleChange() {}
    })
</script>
<style lang="scss">
    /* CSS */
    p {
        color: #58bc58;
    }
</style>
```

# Cooperate With TypeScript

A static type system can help prevent many potential runtime errors, especially as applications grow. You can use `Single File Components(SFC)` cooperate with `Higher Order Components(HOC)` to get support with `TypeScript`
```html
<template name="Eno">
    <div><p>{this.state.name}</p></div>
</template>
<script>
    // TypeScript Support
    import EnoType from './EnoType.tsx'
    export default EnoType(class {
        constructor(props) {
            super(props);
            this.state = { name: 'abc', age: 18}
        }
    })
</script>
<style lang="scss">
    p { color: #58bc58 };
</style>
```
Now, you can create `EnoType.tsx` in editor which provides TypeScript inference inside SFCs and many other great features.
```ts
// EnoType.ts
import React from 'react';
interface EnoTypeProps { }
interface EnoTypeState { name: string }
export default (Component: React.ComponentType) => {
    return class EnoType extends React.Component<EnoTypeProps, EnoTypeState> {
        constructor(props: EnoTypeProps) {
            super(props)
            this.state = { name: 'Eno Yao' }
        }
        render() { return <Component /> }
    }
}
```

There are many cool features provided by `omil`:

- Allows using other webpack loaders for each part of a Omi component, for example Sass for `<style lang="scss">` and JSX/HTML for `<template lang="html">` and ES5+ for `<script type="text/babel">`;
- Allows custom blocks in a `.omi` or `.eno` file that can have custom loader chains applied to them [Here Online Demo](https://github.com/Wscats/omil/tree/master/src/components);
- Treat static assets referenced in `<style>` and `<template>` as module dependencies and handle them with webpack loaders (Such as [htm](https://www.npmjs.com/package/htm), [to-string-loader](https://www.npmjs.com/package/to-string-loader));
- Simulate scoped CSS for each component (Use Shadow DOM);
- State-preserving hot-reloading during development.

In a nutshell, the combination of webpack and `omil` gives you a modern, flexible and extremely powerful front-end workflow for authoring Omi.js applications.

## Thanks

* [omi](https://github.com/Tencent/omi)
* [htm](https://github.com/developit/htm)
* [preact](https://github.com/developit/preact)
* [node-sass](https://github.com/sass/node-sass)
* [styled-components](https://github.com/styled-components/styled-components)

# Contributors

| [<img src="https://avatars1.githubusercontent.com/u/17243165?s=460&v=4" width="60px;"/><br /><sub>Eno Yao</sub>](https://github.com/Wscats)|
|-|
||

## License

MIT
