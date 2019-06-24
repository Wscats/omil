module.exports = {
    deleteCodeComments(code) {
        return code.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '\n').replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '\n')
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