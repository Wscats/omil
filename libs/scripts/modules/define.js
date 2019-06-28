const {
    convertToCamelCase,
    captain,
    isCaptain
} = require('../extension/convert')

module.exports = (option) => {
    let {
        templateComponentName
    } = option

    if (templateComponentName) {
        const templateComponentCamelCaseName = captain(convertToCamelCase(templateComponentName))
        switch (isCaptain(templateComponentName)) {
            case true:
                return `
                    // export default ${templateComponentCamelCaseName}
                `
            default:
                
                return `
                    define('${templateComponentName}', ${templateComponentCamelCaseName});
                `
        }
    } else {
        return ''
    }
}