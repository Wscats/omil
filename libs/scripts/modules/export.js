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
    const templateComponentCamelCaseName = (() => {
        if (templateComponentName) {
            return convertToCamelCase(templateComponentName)
        } else {
            return ''
        }
    })()


    const componentName = (() => {
        if (templateComponentName) {
            const templateComponentCamelCaseName = convertToCamelCase(templateComponentName)
            // return `const ${templateComponentCamelCaseName} =`
            return ``
        } else {
            return `export default`

        }
    })()

    // 2. render()=>{return ``}
    const renderInScript = (() => {
        // style in script
        return /render\s*\([^\)]*\)\s*\{[\s\S]*return([\s\S]*)/g.test(script)
    })()

    // ast(script, null)
    // console.log(script)

    switch (templateLang) {
        // html
        case 'html':
            return `
                    ${componentName} class ${templateComponentCamelCaseName} extends WeElement {
                    ${css}
                    render() {
                        return (html${'`'}${template}${'`'})
                    }
                `
        // jsx
        default:
            return `
                    ${componentName} class ${templateComponentCamelCaseName} extends WeElement {
                    ${css}
                    render() {
                        return ${template}
                    }
                `
    }
}