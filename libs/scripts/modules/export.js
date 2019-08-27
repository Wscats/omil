const {
    convertToCamelCase,
    captain,
    isCaptain
} = require('../extension/convert')

module.exports = (option) => {
    let {
        script,
        style,
        template,
        templateLang,
        templateComponentName
    } = option;
    // console.log(script,template)
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
            return captain(convertToCamelCase(templateComponentName))
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
    // console.log(templateComponentCamelCaseName)

    // 1.module.exports=class{    19 remove . and =
    // 2.export default class {   19
    // console.log(script.match(/export\s+default[\n\s\S]+?class[\s\w]*\{|module.exports\s*=[\n\s\S]*?class\s*\{/g))
    const isHoc = script.match(/export\s+default[\n\s\S]+?class[\s\w]*\{|module.exports\s*=[\n\s\S]*?class\s*\{/g)
    // hoc
    if (isHoc && isHoc[0].replace(/([\s\.\=])/g, "").length > 19) {
        let hocScript;
        switch (isCaptain(templateComponentName)) {
            // react hoc
            case true:
                switch (templateLang) {
                    // html
                    case 'html':
                        return `
                            ${style ? 'const StyledComponents = styled.div`' + style + '`' : ''}
                        `+ `
                            ${script.match(/export\s+default[\n\s\S]+?class[\s\w]*|module.exports\s*=[\n\s\S]*?class\s*/g)[0]} ${templateComponentCamelCaseName} extends WeElement {
                                render() {
                                return (html${'`'}${template}${'`'})
                            }
                        `
                    // jsx
                    default:
                        return `
                            ${style ? 'const StyledComponents = styled.div`' + style + '`' : ''}
                        `+ `
                            ${script.match(/export\s+default[\n\s\S]+?class[\s\w]*|module.exports\s*=[\n\s\S]*?class\s*/g)[0]} ${templateComponentCamelCaseName} extends WeElement {
                                render() {
                                return ${template}
                            }
                        `
                }
            // omi hoc
            default:
                switch (templateLang) {
                    // html
                    case 'html':
                        hocScript = `
                                ${script.match(/export\s+default[\n\s\S]+?class[\s\w]*|module.exports\s*=[\n\s\S]*?class\s*/g)[0]} extends WeElement {
                                render(props) {
                                    return (html${'`'}${template}${'`'})
                                }
                            `.replace(/export\s+default([\n\s\S]+?class[\s\w]*)|module.exports(\s*=[\n\s\S]*?class\s*)/g, `const ${captain(convertToCamelCase(templateComponentName))} = $1$2`)
                        // console.log(hocScript)
                        return hocScript
                    // jsx
                    default:
                        hocScript = `
                            ${script.match(/export\s+default[\n\s\S]+?class[\s\w]*|module.exports\s*=[\n\s\S]*?class\s*/g)[0]} extends WeElement {
                            render(props) {
                                return ${template}
                            }
                        `.replace(/export\s+default([\n\s\S]+?class[\s\w]*)|module.exports(\s*=[\n\s\S]*?class\s*)/g, `const ${captain(convertToCamelCase(templateComponentName))} = $1$2`)
                        // console.log(hocScript)
                        return hocScript
                }

        }
    }

    switch (isCaptain(templateComponentName)) {
        // react without static css
        case true:
            switch (templateLang) {
                // html
                case 'html':
                    return `
                        ${style ? 'const StyledComponents = styled.div`' + style + '`;' : ''}` +
                        `${componentName} class ${templateComponentCamelCaseName} extends WeElement {
                        render() {
                            return (html${'`'}${template}${'`'})
                        }
                    `
                // jsx
                default:
                    return `
                        ${style ? 'const StyledComponents = styled.div`' + style + '`;' : ''}` +
                        `${componentName} class ${templateComponentCamelCaseName} extends WeElement {
                        render() {
                            return ${template}
                        }
                    `
            }
        // omi
        default:
            switch (templateLang) {
                // html
                case 'html':
                    return `
                        ${componentName} class ${templateComponentCamelCaseName} extends WeElement {
                            ${css}
                            render(props) {
                                return (html${'`'}${template}${'`'})
                            }
                        `
                // jsx
                default:
                    return `
                        ${componentName} class ${templateComponentCamelCaseName} extends WeElement {
                            ${css}
                            render(props) {
                                return ${template}
                            }
                        `
            }
    }
}