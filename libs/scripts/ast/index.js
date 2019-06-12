const {
    transform
} = require("@babel/core");
module.exports = async (option, options) => {
    let {
        script,
        allScript,
        isExistScript,
        scriptLang,
        template,
        templateLang,
        templateComponentName,
        style,
        styleLang,
        isExistStyle
    } = option
    const result = await new Promise((resolve, reject) => {
        console.log(allScript)
        const defaultOption = {
            plugins: [
                require("@babel/plugin-proposal-class-properties"),
                {
                    visitor: {
                        ArrayExpression(path) {
                            console.log(path)
                        }
                    }
                }
            ],
            presets: [
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
        transform(allScript, {
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
    return result
}