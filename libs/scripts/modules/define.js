const {
    convertToCamelCase
} = require('../extension/convert')

module.exports = (option) => {
    let {
        templateComponentName
    } = option
    
    if (templateComponentName) {
        const templateComponentCamelCaseName = convertToCamelCase(templateComponentName)
        return `
            define('${templateComponentName}', ${templateComponentCamelCaseName});
        `
    } else {
        return ''
    }
}