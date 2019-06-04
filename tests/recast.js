const recast = require("recast");

// 你的"机器"——一段代码
// 我们使用了很奇怪格式的代码，想测试是否能维持代码结构
const code =
  `
  // JS
    var a = 'abcd'
    import style from './index.css'
    import axios from 'axios'
    export default {
        static css = 'p'
        install() {
            this.data = {
            }
        }
    }
    1
  `
// 用螺丝刀解析机器
const ast = recast.parse(code);

// ast可以处理很巨大的代码文件
// 但我们现在只需要代码块的第一个body，即add函数
// const add  = ast.program.body[0]

console.log(ast.program.body)

// console.log(add.body.body[0].argument.left)