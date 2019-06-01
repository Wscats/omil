module.exports = (option) => {
    let {
        templateComponentName
    } = option
    if (templateComponentName) {
        return `define('${templateComponentName}', ${templateComponentName});`
    } else {
        return ''
    }
}