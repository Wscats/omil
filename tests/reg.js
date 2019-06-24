const deleteCodeComments = (code) => {
    // return code.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '\n')
    // return code.replace(/(|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '\n')
    // return code.replace(/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g, '\n')
    var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g;// 正则表达式
    return code.replace(reg, function (word) { // 去除注释后的文本
        return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;
    });
}

const code = deleteCodeComments(`
// JS
var a = 'abcd'
import style from './index.css'
import axios from 'axios'
// const aa = (_temp = _class = class myAbcAbc extends WeElement2 {
//     css (){ /*231
//         return 
//     }
// })
module.exports = {
    // aaa
    /* bbb
    // 000
    weqwe*/
    axios("http://asdasd.com")
    static css = style + a 
    // static css = style + a
    css(){
        return 'ooooo'
    }
    css(){}
    static arr = ['a','b','c']
    install() {
        this.data = {
        }
    }
    render(){
        let a = 1;
        return 'abc'
    }
    render(){

    }
    abc
}
1
`)

console.log(code)