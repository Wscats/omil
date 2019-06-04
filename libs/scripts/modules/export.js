const {
    convertToCamelCase
} = require('../extension/convert')

module.exports = (option) => {
    let {
        script,
        style,
        template,
        templateLang,
        templateComponentName
    } = option;
    // console.log(templateComponentName)
    // return true or false
    const styleInScript = (() => {
        // style in script
        // return /css\s*\([^\)]*\)\s*\{[\s\S]*return([\s\S]*)/g.test(script)
        return /static\s*css\s*=([^\)]*)/g.test(script)
    })()

    // console.log(script, style, styleInScript)

    // console.log(style,styleInScript)
    const css = (() => {
        if (styleInScript || style === undefined) {
            return ''
        } else {
            // return `
            //     static css() {
            //         return (${'`'}${style}${'`'})
            //     }
            // `
            return `static css =  (${'`'}${style}${'`'})`
        }
    })()
    // console.log(css)
    const componentName = (() => {
        if (templateComponentName) {
            const templateComponentCamelCaseName = convertToCamelCase(templateComponentName)
            return `const ${templateComponentCamelCaseName} =`
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