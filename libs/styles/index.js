const compileStyle = (sourceObj) => {
    // console.log(sourceObj)
    const omi = sourceObj.source
    const type = sourceObj.type
    let compileSassSync = null
    switch (type) {
        // use in omi-snippets
        case 'extension':
            compileSassSync = (sass) => {
                return sass
            }
            break
        // loader branch
        default:
            compileSassSync = require('./loader').compileSassSync
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