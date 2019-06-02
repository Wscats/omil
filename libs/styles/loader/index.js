const sass = require('node-sass')
const compileSass = (data) => {
    return new Promise((resolve, reject) => {
        sass.render({
            data,
        }, function (err, result) {
            if (err) {
                reject()
            } else {
                resolve(result.css.toString())
            }
        });
    })
}
const compileSassSync = (data) => {
    return sass.renderSync({
        data,
    },{
        outputStyle: 'compressed'
    })
    .css
    .toString()
}

module.exports = {
    compileSass,
    compileSassSync
}