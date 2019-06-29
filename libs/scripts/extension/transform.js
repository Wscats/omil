const {
    transform,
    transformSync
} = require("@babel/core");
module.exports = (code, options) => {
    return new Promise((resolve, reject) => {
        // console.log(code,options)
        const defaultOption = {
            plugins: [
                require("@babel/plugin-proposal-class-properties")
            ],
            presets: [
                // [require('@babel/plugin-proposal-class-properties')],
                // [require("@babel/preset-env")],
                [
                    require("@babel/preset-react"),
                    {
                        "pragma": "h",
                    }
                ]
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