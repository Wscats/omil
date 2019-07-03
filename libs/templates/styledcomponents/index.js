const cheerio = require('cheerio');
module.exports = ({ style, template }) => {
    // console.log({ style, template })
    // console.log($('StyledComponents').html())
    if (style) {
        return template
    } else {
        let $ = cheerio.load(template)
        return $('StyledComponents').html()
    }
}
