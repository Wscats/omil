const {
    transformSync
} = require("@babel/core");
module.exports = (code, options) => {
    let output = transformSync(code, {
        plugins: [
            require("@babel/plugin-proposal-class-properties")
        ]
    })
    return output
}