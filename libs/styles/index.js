const compileStyle = (omi) => {
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
    const style = (
        // remove <script> and </script> tag
        styleInTag
        .replace(/<style[^>]*>|<\/style>/g, '')
    )
    const styleLang = (() => {
        if (styleInTag) {
            styleInTag
                .match(/<style[^>]*>/g)[0]
                .replace(/<style\s+lang=["']([^>]*)["']\s*>/g, '$1')
        }
    })()
    return {
        isExistStyle: styleInTag ? true : false,
        styleLang,
        style
    };
}

module.exports = compileStyle