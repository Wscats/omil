// const compileStyle = require('../styles/index')
const compileTemplate = require('../templates/index')
const compileScript = require('../scripts/index')

// const getModules = require('../utils/getModules')
const modulesStart = require('../scripts/modules/import')
const modulesEnd = require('../scripts/modules/export')

// handle sass
const compileSass = require('../styles/extension/index').compileSass
const path = require('path')
const compileAll = async (sourceObj, options, callback) => {
    // html
    let {
        template,
        templateLang,
    } = html = compileTemplate(sourceObj)
    // js
    let {
        script,
        isExistScript,
        scriptLang,
        // variable
        style,
        isExistStyle,
        styleLang
    } = js = compileScript(sourceObj)
    // sass and jsx
    // use in omi-snippets
    style = sourceObj.sass === 'extension' ? (await compileSass(style)).text : style
    if (sourceObj.sass === 'extension' && templateLang !== 'html' && templateLang !== 'htm') {
        const transform = require('../scripts/transformSnippets')
        // handle template
        template = (await transform(template, {
            // not in strict mode
            sourceType: 'script'
        })).code
        console.log(template)
    }

    try {
        const allScript = (
            // import html modules to transform html to jsx 
            modulesStart({
                script,
                isExistScript,
                scriptLang,
                template,
                templateLang,
                style,
                styleLang,
                isExistStyle,
            }) +
            script
            // load css and html
            .replace(/export\s+default\s*\{|module.exports\s*=\s*\{/g, modulesEnd({
                script,
                isExistScript,
                scriptLang,
                template,
                templateLang,
                style,
                styleLang,
                isExistStyle,
            })))

        // console.log(result)
        // console.log(allScript)
        // as async return
        if (sourceObj.sass === 'extension') {
            callback(allScript)
        } else {
            // handle template
            const transform = require('../scripts/transform')
            // html2jsx and es62es5
            const result = await transform(allScript, options)
            callback(null, result.code, result.map)
        }

        // callback(null, result.code)
    } catch (e) {
        console.log(e)
        // throw new Error("babel compile failed, see issues https://github.com/Wscats/eno-loader/issues");
    }
}

module.exports = compileAll