module.exports = (option) => {
        let {
            script,
            style,
            template,
            templateLang,
            templateComponentName
        } = option;
        console.log(templateComponentName)
        // return true or false
        const styleInScript = (() => {
            // style in script
            return /css\s*\([^\)]*\)\s*\{[\s\S]*return([\s\S]*)/g.test(script)
        })()
        // console.log(style,styleInScript)
        const css = (() => {
            if (styleInScript || style === undefined) {
                return ''
            } else {
                return `css() {
                    return (${'`'}${style}${'`'})
                }`
                
            }
        })()
        // define('${templateComponentName}', ${templateComponentName});
        const componentName = (() => {
            if(templateComponentName){
                return `const ${templateComponentName} =`
            } else {
                return `export default`

            }
        })()

        switch (templateLang) {
            // html
            case 'html':
                return `
                    ${componentName} class extends WeElement {
                    ${css}
                    render() {
                        return (html${'`'}${template}${'`'})
                    }
                `
        // jsx
        default:
            return `
                    ${componentName} class extends WeElement {
                    ${css}
                    render() {
                        return ${template}
                    }
                `
    }
}