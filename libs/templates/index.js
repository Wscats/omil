const annotation = require('../utils/annotation')
const {
    convertToCamelCase,
    captain,
    isCaptain
} = require('../scripts/extension/convert')
const cheerio = require('cheerio')
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
            let $ = cheerio.load(lang)
            // console.log($('template').attr('lang')||'')
            // return lang.replace(/<template\s+lang=["']([^>]*)["']\s*>/g, '$1')
            return $('template').attr('lang').replace(/^\s*|\s*$/g, "") || ''
        } else {
            return ''
        }
    })()
    const templateComponentName = (() => {
        let name = templateInTag.match(/<template[^>]*>/g)[0]
        if (name.indexOf('name') >= 0) {
            let $ = cheerio.load(name)
            // console.log($('template').attr('name')||'')
            // return name.replace(/<template\s+name=["']([^>]*)["']\s*>/g, '$1')
            return $('template').attr('name').replace(/^\s*|\s*$/g, "") || ''
        } else {
            return ''
        }
    })()
    // <StyledComponents>xxx</StyledComponents>
    if(isCaptain(templateComponentName)){
        template = `<StyledComponents>${template}</StyledComponents>`
    }
    // console.log(template,templateComponentName)
    // const templateWithRender = (() => {
    //     let render = templateInTag.match(/<template[^>]*>/g)[0]
    //     let $ = cheerio.load(render)
    //     console.log($('template').attr('render'))
    //     if (render.indexOf('render') >= 0) {
    //         let $ = cheerio.load(render)
    //         return $('template').attr('render').replace(/^\s*|\s*$/g, "") || ''
    //     } else {
    //         return ''
    //     }
    // })()

    // console.log(templateWithRender)
    
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