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

// https://astexplorer.net/


const source = "my-module";

const ast = template.ast(`
// JS
var a = 'abcd'
`);
ast.kind = 'let'

console.log(ast);
console.log(generate(ast).code);