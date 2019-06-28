const {
    convertToCamelCase,
    captain,
    isCaptain
} = require('../extension/convert')

module.exports = (option) => {
    let {
        templateComponentName,
        script
    } = option

    if (templateComponentName) {
        const templateComponentCamelCaseName = captain(convertToCamelCase(templateComponentName))
        const isHoc = script.match(/export\s+default[\n\s\S]+?class[\s\w]*\{|module.exports\s*=[\n\s\S]*?class\s*\{/g)
        // hoc
        if (isHoc && isHoc[0].replace(/([\s\.\=])/g, "").length > 19) {
            return `
                // export default ${templateComponentCamelCaseName}
            `
        } else {
            switch (isCaptain(templateComponentName)) {
                case true:
                    return `
                        export default ${templateComponentCamelCaseName}
                    `
                default:

                    return `
                    define('${templateComponentName}', ${templateComponentCamelCaseName});
                `
            }
        }

    } else {
        return ''
    }
}