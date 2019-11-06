// const cheerio = require('cheerio');
module.exports = ({ style, template }) => {
    // console.log({ style, template })
    // console.log($('StyledComponents').html())
    if (style) {
        return template
    } else {
        // let $ = cheerio.load(template)
        // let html = $('StyledComponents').html()
        // console.log(html)
        template = template.replace(/\<StyledComponents\>([\n\s\S]*)<\/StyledComponents\>/g, '$1')
        // console.log(template)
        // return html ? html : template
        return template
    }
}
