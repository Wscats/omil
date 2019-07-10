const cheerio = require('cheerio');
module.exports = ({ style, template }) => {
    // console.log({ style, template })
    // console.log($('StyledComponents').html())
    if (style) {
        return template
    } else {
        let $ = cheerio.load(template)
        let html = $('StyledComponents').html()
        return html ? html : template
    }
}
