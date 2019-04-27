const compileAll = require('./loaders/index')
module.exports = (content) => {
    let output = compileAll(content)
    // console.log(output);
    return output;
};