module.exports = (option) => {
    const {
        script,
        isExistScript,
        scriptLang,
        template,
        templateLang,
        templateComponentName,
        style,
        styleLang,
        isExistStyle,
    } = option
    // console.log(option)
    return `
        import {
            // register component
            WeElement,
            // when you use component, you should define
            ${
                templateComponentName?'define,':''
            }
            ${
                // JSX or HTML
                // html,
                // htm,
                templateLang==='html'||templateLang==='htm'?'html':'h'
            }
        } from "omi";
    `
}