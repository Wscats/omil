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
        // console.log(allScript)
        const defaultOption = {
            plugins: [
                require("@babel/plugin-proposal-class-properties"),
                {
                    visitor: {
                        "ClassExpression"(path, { opts }) {
                            // 筛选class myAbcAbc extends WeElement
                            console.log('---------------')
                            // if(path.node.superClass.name === 'WeElement'){
                            //     // 筛选render() {}
                            //     // console.log(path.node.superClass.name)
                            //     path.node.body.body.forEach((item) => {
                            //         if (item.key.name === 'render') {
                            //             console.log(item)
                            //             item.remove()
                            //             // console.log(item.get("body"))
                            //             // item.key.name = 'r'
                            //         }
                            //     })
                            // }
                            // path.remove()

                            // 筛选class myAbcAbc extends WeElement
                            if (path.node.superClass.name === 'WeElement') {
                                path.get("body.body.0").remove()
                            }
                            // console.log(path.get("body.body.1"))

                            // console.log(opts)
                            // console.log(path.get("render"))

                        },
                        // "ClassExpression"(path) {
                        //     console.log(path)
                        // },
                        // "ImportDeclaration"(path){
                        //     path.remove()
                        // }
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
    console.log(result.code)
    return result
}