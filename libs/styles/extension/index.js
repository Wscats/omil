const sass = require('./sass.sync.js')

const compileSass = (data) => {
    return new Promise((resolve, reject) => {
        sass.compile(data, {
            style: sass.style.compressed,
            // style: sass.style.compact,
            // style: sass.style.expanded,
            // style: sass.style.nested,
        }, (result) => {
            // console.log(result)
            resolve(result)
        });
    })
}

module.exports = {
    compileSass
}