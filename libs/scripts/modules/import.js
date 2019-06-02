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
        sourceObj
    } = option

    const {
        file
    } = sourceObj
    switch (file) {
        case 'html':
            return `
                const {
                    ${
                        // register component
                        'WeElement,'
                    }
                    ${
                        // when you use component, you should define
                        templateComponentName?'define,':''
                    }
                    html,
                    h,
                    render
                } = omi;
            `
            break
        default:
            return `
                import {
                    ${
                        // register component
                        'WeElement,'
                    }
                    ${
                        // when you use component, you should define
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

}