const template = require('@babel/template').default;
const generate = require("@babel/generator").default;

const ast = template.ast(`
// JS
    var a = 'abcd'
    import style from './index.css'
    import axios from 'axios'
    export default {
        css(){
            return 'ooooo'
        },
        install() {
            this.data = {
            }
        },
        render(){
            return
        }
    }
    1
`);
// ast.kind = 'const'
console.log(ast)
// ast.kind = 'let';
// ast.declarations[0].init.value = 1234;
// console.log(ast.declarations[0].init);

console.log(generate(ast).code);