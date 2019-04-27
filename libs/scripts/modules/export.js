module.exports = (option) => {
        let {
            style,
            template,
            templateLang
        } = option;
        switch (templateLang) {
            // html
            case 'html':
                return `
                import 'omi-html';
                export default class extends WeElement {
                    css() {
                        return (${'`'}${style}${'`'})
                    }
                    render() {
                        return (html${'`'}${template}${'`'})
                    }
                `
        // jsx
        default:
            return `
                export default class extends WeElement {
                    css() {
                        return (${'`'}${style}${'`'})
                    }
                    render() {
                        return (${template})
                    }
                `
    }
}