const compileStyle = (sourceObj) => {
    // console.log(sourceObj)
    const omi = sourceObj.source
    const sass = sourceObj.sass
    let compileSassSync = null
    switch (sass) {
        case 'extension':
            compileSassSync = require('./extension').compileSass
            break
        default:
            compileSassSync = require('./loader').compileSassSync
            console.log(compileSassSync)
    }

    const styleInTag = (() => {
        // match <script>xxx</script> content
        let isExistStyle = omi.match(/<style[^>]*>[\s\S]*?<\/style>/g)
        // judge <style> whether exist or not
        if (isExistStyle) {
            return isExistStyle[0]
        } else {
            return ''
        }
    })()
    let style = (
        // remove <script> and </script> tag
        styleInTag
        .replace(/<style[^>]*>|<\/style>/g, '')
    )
    const styleLang = (() => {
        if (styleInTag) {
            return styleInTag
                .match(/<style[^>]*>/g)[0]
                .replace(/<style\s+lang=["']([^>]*)["']\s*>/g, '$1')
        }
    })()
    // console.log(style, styleInTag.match(/<style[^>]*>/g)[0].replace(/<style\s+lang=["']([^>]*)["']\s*>/g, '$1'))
    switch (styleLang) {
        case 'scss':
            style = compileSassSync(style)
            // style = await compileSassSync(style)
            console.log(style)
            break
        default:
            style = style
    }
    return {
        isExistStyle: styleInTag ? true : false,
        styleLang,
        style
    };
}

module.exports = compileStyle