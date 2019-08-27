const compileStyle = require('../styles/index')
const compileTemplate = require('../templates/index')
const compileScript = require('../scripts/index')

// const getModules = require('../utils/getModules')
const modulesStart = require('../scripts/modules/import')
const modulesEnd = require('../scripts/modules/export')
const defineComponent = require('../scripts/modules/define')
const renderComponent = require('../scripts/modules/render')

// hander styled components
const handleStyledComponents = require('../templates/styledcomponents')

// handle ast
const ast = require('../scripts/ast')

// handle sass
const compileSass = require('../styles/extension/index').compileSass
const path = require('path')
const compileAll = async (sourceObj, options, callback) => {
    // html
    let {
        template,
        templateLang,
        templateComponentName,
        templateFrameworkName
    } = html = compileTemplate(sourceObj)
    // css
    let {
        style,
        isExistStyle,
        styleLang,
    } = compileStyle(sourceObj)

    // console.log(style,styleLang)
    // sass and jsx
    // use in omi-snippets
    style = sourceObj.type === 'extension' && styleLang === 'scss' ? ((await compileSass(style)).text || '').replace(/[\r\n]/g, "") : style
    // js
    let {
        script,
        isExistScript,
        scriptType,
        scriptLang,
        // variable
        // style,
        // isExistStyle,
        // styleLang
    } = js = compileScript({
        ...sourceObj,
        style,
        styleLang,
        isExistStyle,
        templateComponentName
    })
    // console.log(template)
    // console.log(style)
    // console.log(script)
    // whether <StyledComponents> exist
    template = handleStyledComponents({ style, template });

    // html -> jsx
    if (templateLang !== 'html' && templateLang !== 'htm') {
        const transform = require('../scripts/extension/transform')
        // handle template
        template = (await transform(template, {
            // not in strict mode
            sourceType: 'script',
        })).code
        // console.log(template)
    }
    // console.log(template)
    try {
        let allScript = (
            // import html modules to transform html to jsx 
            modulesStart({
                script,
                isExistScript,
                scriptLang,
                template,
                templateLang,
                templateComponentName,
                templateFrameworkName,
                style,
                styleLang,
                isExistStyle,
                sourceObj
            }) +
            script
                // load css and html
                // support export default {} and export default class {}
                .replace(/export\s+default\s*\{|module.exports\s*=\s*\{|export\s+default\s*class\s*\{|module.exports\s*=\s*class\s*\{|export\s+default[\n\s\S]+?class[\s\w]*\{|module.exports\s*=[\n\s\S]*?class\s*\{/g, modulesEnd({
                    script,
                    isExistScript,
                    scriptLang,
                    template,
                    templateLang,
                    templateComponentName,
                    style,
                    styleLang,
                    isExistStyle,
                })) +
            // define('my-eno', myEno)
            defineComponent({
                script,
                templateComponentName
            }) +
            // render(html`my-eno`, body)
            renderComponent({
                templateComponentName,
                sourceObj
            })
        )
        // console.log(allScript)
        // ast
        allScript = (await ast({
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
        }, null)).code
        // console.log(allScript)
        // as async return
        if (sourceObj.type === 'extension') {
            // callback(allScript)
            callback({
                status: 'success',
                allScript,
                e: null
            })
        } else {
            // handle template
            const transform = require('../scripts/loader/transform')
            // es6 -> es5
            const result = await transform(allScript, options)
            // console.log(result)
            callback(null, result.code, result.map)
        }

        // callback(null, result.code)
    } catch (e) {
        callback({
            status: 'fail',
            allScript: '',
            e
        })
        console.log(e)
        // throw new Error("babel compile failed, see issues https://github.com/Wscats/eno-loader/issues");
    }
}

module.exports = compileAll