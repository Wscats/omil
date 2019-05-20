// const compileStyle = require('../styles/index')
const compileTemplate = require('../templates/index')
const compileScript = require('../scripts/index')
const transform = require('../scripts/transform')
// const getModules = require('../utils/getModules')
const modulesStart = require('../scripts/modules/import')
const modulesEnd = require('../scripts/modules/export')
// handle sass
const compileSass = require('../styles/extension/index').compileSass
const path = require('path')
const compileAll = async (sourceObj, options, callback) => {
    // html
    const {
        template,
        templateLang,
    } = html = compileTemplate(sourceObj)
    // js
    let {
        script,
        isExistScript,
        scriptLang,
        style,
        isExistStyle,
        styleLang
    } = js = compileScript(sourceObj)
    // sass
    // use in omi-snippets
    style = sourceObj.sass === 'extension' ? (await compileSass(style)).text : style
    try {
        const allScript = (
            // import html modules to transform html to jsx 
            modulesStart +
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
        // html2jsx and es62es5
        const result = await transform(allScript, options)
        // console.log(result)
        // console.log(allScript)
        // as async return
        callback(null, result.code, result.map)
        // callback(null, result.code)
    } catch (e) {
        console.log(e)
        // throw new Error("babel compile failed, see issues https://github.com/Wscats/eno-loader/issues");
    }
}

module.exports = compileAll