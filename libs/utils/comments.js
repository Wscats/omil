module.exports = {
    deleteCodeComments(code) {
        // console.log(code)
        // return code.replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, '\n')
        // return code.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '\n').replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '\n')
        // return code.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '\n').replace(/(|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '\n')
        // let noComment = code.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '\n')
        // let noComment2 = code.replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '\n');
        // console.log(noComment2)
        // return noComment
        let reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g;// 正则表达式
        return code.replace(reg, function (word) { // 去除注释后的文本
            return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;
        });
    }
}
// function deleteCodeComments(code) {
//     return code.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '\n').replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '\n')
// }
// let string = `
//     // abc
//     abc
//     cba
//     /*** 179283719 
//     213132*/
// `
// let result = deleteCodeComments(string)
// console.log(result)