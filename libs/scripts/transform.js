const {
    transform
} = require("@babel/core");
module.exports = (code) => {
    return new Promise((resolve, reject) => {
        transform(code, {
            presets: [
                ["@babel/preset-env"],
                [
                    "@babel/preset-react",
                    {
                        "pragma": "h",
                    }
                ]
            ],
        }, (err, result) => {
            if (err) {
                reject()
            } else {
                resolve(result)
            }
        });
    })
}