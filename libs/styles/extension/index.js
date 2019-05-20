const sass = require('./sass.sync.js')

const compileSass = (data) => {
    return new Promise((resolve, reject) => {
        sass.compile(data, (result) => {
            resolve(result)
        });
    })
}

module.exports = {
    compileSass
}