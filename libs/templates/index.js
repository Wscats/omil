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
    const templateLang = (() => {
        let lang = templateInTag.match(/<template[^>]*>/g)[0]
        if (lang.indexOf('lang') >= 0) {
            return lang.replace(/<template\s+lang=["']([^>]*)["']\s*>/g, '$1')
        } else {
            return ''
        }
    })()
    const templateComponentName = (() => {
        let name = templateInTag.match(/<template[^>]*>/g)[0]
        if (name.indexOf('name') >= 0) {
            return name.replace(/<template\s+name=["']([^>]*)["']\s*>/g, '$1')
        } else {
            return ''
        }
    })()
    // remove annotation
    template = annotation.remove({
        code: template,
        type: 'html'
    })
    return {
        template,
        templateLang,
        templateComponentName
    }
}

module.exports = compileTemplate