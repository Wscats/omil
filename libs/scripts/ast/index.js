const {
    transform
} = require("@babel/core");

// const t = require("@babel/types");
module.exports = (option, options) => {
    let {
        script,
        allScript,
        isExistScript,
        scriptType,
        scriptLang,
        template,
        templateLang,
        templateComponentName,
        style,
        styleLang,
        isExistStyle
    } = option
    // console.log(option)
    return new Promise((resolve, reject) => {
        // console.log(allScript)
        let presets = [
            [
                require("@babel/preset-react"),
                {
                    "pragma": "h",
                },
            ]
        ]

        if (scriptType === 'text/babel') {
            presets.push(require("@babel/preset-env"))
        }
        // console.log(presets)
        const defaultOption = {
            plugins: [
                [require("@babel/plugin-proposal-class-properties"),
                { "loose": true },
                ],
                {
                    visitor: {
                        "ClassExpression"(path, { opts }) {
                            // 筛选class myAbcAbc extends WeElement
                            if (path.node.superClass && path.node.superClass.name === 'WeElement') {
                                // console.log('------------------------ClassExpression-----------------------')
                                // console.log(path.get("body.body"))
                                let ClassMethods = [];
                                path.get("body.body").forEach((ClassMethod) => {
                                    // 筛选render() {}
                                    if (ClassMethod.node.key.name === 'render') {
                                        // console.log(ClassMethod.type)
                                        ClassMethods.push(ClassMethod)
                                        // ClassMethod.remove()
                                        // 删除所有css() {}
                                    } else if (ClassMethod.node.key.name === 'css') {
                                        ClassMethod.remove()
                                    }
                                })
                                // 获取最后一个render函数
                                let lastRenderFn = ClassMethods[ClassMethods.length - 1];
                                // 删除除第一个以外的其他render
                                if (ClassMethods) {
                                    for (let i = 0; i < ClassMethods.length; i++) {
                                        if (i != 0) {
                                            ClassMethods[i].remove()
                                        }
                                    }
                                }
                                if (lastRenderFn) {
                                    // lastRenderFn.replaceWithMultiple([
                                    //     t.expressionStatement(t.stringLiteral("Is this the real life?")),
                                    //     t.expressionStatement(t.stringLiteral("Is this just fantasy?")),
                                    //     t.expressionStatement(t.stringLiteral("(Enjoy singing the rest of the song in your head)")),
                                    // ])
                                    // lastRenderFn.remove();
                                    // console.log(t);
                                    // lastRenderFn.get("body.body").remove()
                                    // path.find((path) => path.isReturnStatement());
                                    // 寻找return的地方
                                    // let returnStatement = lastRenderFn.get("body.body").find((path) => path.isReturnStatement());
                                    // console.log(returnStatement)
                                    // returnStatement.replaceWithMultiple([
                                    //     // lastRenderFn,
                                    //     // template
                                    //     // t.returnStatement(t.jsxEmptyExpression())
                                    //     t.expressionStatement(t.stringLiteral("Is this the real life?")),
                                    //     // t.expressionStatement(t.stringLiteral("Is this just fantasy?")),
                                    //     // t.expressionStatement(t.stringLiteral("(Enjoy singing the rest of the song in your head)")),
                                    // ])
                                    // console.log({
                                    //     ...returnStatement
                                    // })
                                    // console.log(returnStatement)
                                    // console.log(lastRenderFn.node.body)
                                    // returnStatement.getCode
                                    // returnStatement.insertAfter(t.blockStatement([returnStatement]))
                                    // console.log(lastRenderFn.get("body.body"));
                                }
                            }

                        },
                        // "ClassExpression"(path) {
                        //     console.log(path)
                        // },
                        "ImportDeclaration"(path) {
                            if (scriptType === 'module') {
                                path.remove()
                            }
                        },
                        "ClassDeclaration"(path) {
                            // console.log('-----------------------ClassDeclaration------------------------')
                            // console.log(path)
                            // 筛选class myAbcAbc extends WeElement
                            if (path.node.superClass.name === 'WeElement') {
                                // console.log(path.get("body.body"))
                                let ClassMethods = [];
                                path.get("body.body").forEach((ClassMethod) => {
                                    // 筛选render() {}
                                    if (ClassMethod.node.key.name === 'render') {
                                        // console.log(ClassMethod.type)
                                        ClassMethods.push(ClassMethod)
                                        // ClassMethod.remove()
                                        // 删除所有css() {}
                                    } else if (ClassMethod.node.key.name === 'css') {
                                        ClassMethod.remove()
                                    }
                                })
                                // 获取最后一个render函数
                                // let lastRenderFn = ClassMethods[ClassMethods.length - 1];
                                // 删除除第一个以外的其他render
                                if (ClassMethods) {
                                    for (let i = 0; i < ClassMethods.length; i++) {
                                        if (i != 0) {
                                            ClassMethods[i].remove()
                                        }
                                    }
                                }
                                // let returnStatement = lastRenderFn.get("body.body").find((path) => path.isReturnStatement());
                                // console.log(lastRenderFn.get("body"))
                                // returnStatement.replaceWithMultiple([
                                //     // lastRenderFn,
                                //     // template
                                //     // t.returnStatement(t.jsxEmptyExpression())
                                //     t.expressionStatement(t.stringLiteral("Is this the real life?")),
                                //     // t.expressionStatement(t.stringLiteral("Is this just fantasy?")),
                                //     // t.expressionStatement(t.stringLiteral("(Enjoy singing the rest of the song in your head)")),
                                // ])
                            }
                        }
                    }
                }
            ],
            comments: false,
            presets
            // :[
            //     require("@babel/preset-react"),
            //     [
            //         {
            //             "pragma": "h",
            //         },
            //     ]
            // ]

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
                // console.log(result.code)
                resolve(result)
            }
        });
    })
    // console.log(result.code)
    // return result
}