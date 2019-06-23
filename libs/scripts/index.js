const compileStyle = require('../styles/index')
const cheerio = require('cheerio')
const compileScript = (sourceObj) => {
    const omi = sourceObj.source
    const {
        style,
        isExistStyle,
        styleLang
    } = sourceObj

    const scriptInTag = (() => {
        // match some content like <script>xxx</script>
        let isExistScript = omi.match(/<script[^>]*>[\s\S]*?<\/script>/g)
        // judge <script> whether exist or not
        if (isExistScript) {
            return isExistScript[0]
        } else {
            return '<script>module.exports={}</script>'
        }
    })()
    let script = (
        // clear tag which is <script> and </script>
        scriptInTag
            .replace(/<script[^>]*>|<\/script>/g, '')
    )
    const styleInScript = (() => {
        // if css(){} in script , we should combine style and css functuon
        // script =  script.replace(/css\s*\([^\)]*\)\s*\{[\s\S]*return([\s\S]*)/g, `static css(){return ${'`'}${style}${'`'}+$1`)
        // console.log(style)
        script = script.replace(/static\s*css\s*=([^\)]*)/g, `static css = ${'`'}${style}${'`'}+$1`)
        // console.log(script)
        return script
    })()

    const scriptType = (() => {
        let type = scriptInTag.match(/<script[^>]*>/g)[0]
        if (type.indexOf('type') >= 0) {
            let $ = cheerio.load(type)
            // console.log($('template').attr('lang')||'')
            // return lang.replace(/<template\s+lang=["']([^>]*)["']\s*>/g, '$1')
            return $('script').attr('type').replace(/^\s*|\s*$/g, "") || ''
        } else {
            return ''
        }
    })()


    const scriptLang = (() => {
        if (scriptInTag) {
            return scriptInTag
                .match(/<script[^>]*>/g)[0]
                .replace(/<script\s+lang=["']([^>]*)["']\s*>/g, '$1')
        }
    })()
    return {
        isExistScript: scriptInTag ? true : false,
        scriptType,
        scriptLang,
        script,
        style,
        isExistStyle,
        styleLang
    };

}

module.exports = compileScript