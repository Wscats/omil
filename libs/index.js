const compileAll = require('./loaders/index')
module.exports = (content) => {
    let output = compileAll(content)
    return output;
};