module.exports = (option) => {
        let {
            script,
            style,
            template,
            templateLang
        } = option;
        // return true or false
        const styleInScript = (() => {
            // style in script
            return /css\s*\([^\)]*\)\s*\{[\s\S]*return([\s\S]*)/g.test(script)
        })()
        // console.log(style,styleInScript)
        const css = (() => {
            if(styleInScript || style === undefined){
                return ''
            }else{
                return `css() {
                    return (${'`'}${style}${'`'})
                }`
                
            }
        })()
        switch (templateLang) {
            // html
            case 'html':
                return `
                export default class extends WeElement {
                    ${css}
                    render() {
                        return (html${'`'}${template}${'`'})
                    }
                `
        // jsx
        default:
            return `
                export default class extends WeElement {
                    ${css}
                    render() {
                        return ${template}
                    }
                `
    }
}