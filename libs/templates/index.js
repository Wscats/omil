const annotation = require('../utils/annotation')
const {
    convertToCamelCase,
    captain,
    isCaptain
} = require('../scripts/extension/convert')
const cheerio = require('cheerio')

const findAttr = (templateInTag, attr) => {
    let attrKey = templateInTag.match(/<template[^>]*>/g)[0]
    if (attrKey.indexOf(attr) >= 0) {
        let $ = cheerio.load(attrKey)
        return $('template').attr(attr).replace(/^\s*|\s*$/g, "") || ''
    } else {
        return ''
    }
}

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

    // lang="xxx"
    const templateLang = findAttr(templateInTag, 'lang')

    // name="xxx"
    const templateComponentName = findAttr(templateInTag, 'name')

    // framework="xxx"
    const templateFrameworkName = findAttr(templateInTag, 'framework')

    // <StyledComponents>xxx</StyledComponents>
    if (isCaptain(templateComponentName)) {
        template = `<StyledComponents>${template}</StyledComponents>`
    }

    // render="xxx"
    // const templateWithRender = findAttr(templateInTag, 'render')

    // console.log({
    //     templateLang,
    //     templateComponentName,
    //     templateFrameworkName
    // })

    // remove annotation
    template = annotation.remove({
        code: template,
        type: 'html'
    })
    return {
        template,
        templateLang,
        templateComponentName,
        templateFrameworkName
    }
}

module.exports = compileTemplate