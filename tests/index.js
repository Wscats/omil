const cheerio = require('cheerio');
const fs = require('fs');
fs.readFile('./meituan.html', (err, data) => {
    // console.log(data.toString());
    const html = data.toString();
    const $ = cheerio.load(html);
    // console.log($('style'));
    let style = "";
    $('style').each((index, item) => {
        console.log($(item).html())
        style += $(item).html()
    })
    fs.writeFileSync('./style.css',style)
})
// cheerio.load()