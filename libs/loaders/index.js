const compileStyle = require('../styles/index')
const compileTemplate = require('../templates/index')
const compileScript = require('../scripts/index')
const transform = require('../scripts/transform')
const getModules = require('../utils/getModules')
const modulesEnd = require('../scripts/modules/export')
const path = require('path')
const compileAll = async (omi) => {
    // html
    const {
        template,
        templateLang,
    } = compileTemplate(omi)
    // js
    const {
        script,
        isExistScript,
        scriptLang,
        style,
        isExistStyle,
        styleLang
    } = compileScript(omi)
    try {
        const modulesStart = await getModules(path.resolve('./libs/scripts/modules/import'))
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
        const result = await transform(allScript)
        return result.code
    } catch {
        throw new Error("See issues https://github.com/Wscats/eno-loader/issues");
    }
}

module.exports = compileAll