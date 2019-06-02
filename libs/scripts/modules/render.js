module.exports = (option) => {
    let {
        templateComponentName,
        sourceObj
    } = option

    if (templateComponentName&&sourceObj.file==='html') {
        // console.log(templateComponentName, sourceObj.file)
        return `
            render(html${'`<'}${templateComponentName}${'/>`'}, 'body');
        `
    } else {
        return ''
    }
}