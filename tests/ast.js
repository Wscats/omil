// import template from "@babel/template";
const template = require('@babel/template').default
const generate = require("@babel/generator").default;
const t = require('@babel/types')
// import generate from "@babel/generator";
// console.log(template,t)
// const buildRequire = template(`
//   var %%importName%% = require(%%source%%);
// `);
// const ast = buildRequire({
//   importName: t.identifier("myModule"),
//   source: t.stringLiteral("my-module"),
// });


const source = "my-module";

const ast = template.ast(`
// JS
var a = 'abcd'
import style from './index.css'
import axios from 'axios'
export default {
    css = 'p'
    install() {
        this.data = {
        }
    }
}
1
`);


console.log(ast);
console.log(generate(ast).code);