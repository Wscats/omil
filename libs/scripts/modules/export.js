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
    // 1. static css = `xxx`
    const styleInScript = (() => {
        // style in script
        return /static\s*css\s*=([^\)]*)/g.test(script)
    })()
    // 2. css()=>{return ``}
    const styleInScript2 = (() => {
        // style in script
        return /css\s*\([^\)]*\)\s*\{[\s\S]*return([\s\S]*)/g.test(script)
    })()
    const css = (() => {
        if (styleInScript || style === undefined) {
            return ''
        } else {
            return `static css =  (${'`'}${style}${'`'})`
        }
    })()

    const css2 = (() => {
        if (styleInScript2 || style === undefined) {
            return ''
        } else {
            return `
                css() {
                    return (${'`'}${style}${'`'})
                }
            `
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