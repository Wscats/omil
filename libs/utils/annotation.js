module.exports = {
    remove(option) {
        const {
            code,
            type
        } = option
        switch (type) {
            case 'html':
                return html(code)
        }
    }
}

const html = (code) => {
    code = code.replace(/<!--\s*[\s\S]*\s*-->/g, '')
    return code
}