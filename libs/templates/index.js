const annotation = require('../utils/annotation')
const compileTemplate = (sourceObj) => {
    const omi = sourceObj.source
    const templateInTag = (
        omi
        .match(/<template[^>]*>([\s\S]*?)<\/template>/g)[0]
    )
    let template = (
        templateInTag
        .replace(/<template[^>]*>|<\/template>/g, '')
    )
    const templateLang = (
        templateInTag
        .match(/<template[^>]*>/g)[0]
        .replace(/<template\s+lang=["']([^>]*)["']\s*>/g, '$1')
    )
    // remove annotation
    template = annotation.remove({
        code: template,
        type: 'html'
    })
    return {
        template,
        templateLang
    }
}

module.exports = compileTemplate