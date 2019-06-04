const {
    transform
} = require("@babel/core");
module.exports = (code, options) => {
    return new Promise((resolve, reject) => {
        const defaultOption = {
            presets: [
                ["@babel/preset-env"],
                // [
                //     "@babel/preset-react",
                //     {
                //         "pragma": "h",
                //     }
                // ]
            ],
            
        }
        // comibine option
        const finalOptions = Object.assign({}, defaultOption, {
            ...options
        });
        // console.log(finalOptions)
        transform(code, {
            ...finalOptions
        }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                // console.log(result)
                resolve(result)
            }
        });
    })
}