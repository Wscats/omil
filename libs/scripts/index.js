const compileScript = (omi) => {
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
    const script = (
        // clear tag which is <script> and </script>
        scriptInTag
        .replace(/<script[^>]*>|<\/script>/g, '')
    )
    const scriptLang = (() => {
        if (scriptInTag) {
            return scriptInTag
                .match(/<script[^>]*>/g)[0]
                .replace(/<script\s+lang=["']([^>]*)["']\s*>/g, '$1')
        }
    })()
    return {
        isExistScript: scriptInTag ? true : false,
        scriptLang,
        script
    };
}

module.exports = compileScript