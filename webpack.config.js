const path = require('path');
module.exports = {
    // devtool: 'source-map',
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.test.js'
    },
    module: {
        rules: [{
            test: /\.omi|eno$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                // test
                loader: path.resolve(__dirname, 'libs'),
                options: {
                    sourceMaps: 'both',
                    plugins: [
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                "absoluteRuntime": false,
                                "corejs": false,
                                "helpers": true,
                                "regenerator": true,
                                "useESModules": false
                            }
                        ]
                    ]
                }
            }],
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }, {
            test: /\.css$/,
            use: ['to-string-loader', 'css-loader']
        }, {
            test: /\.(png|jpg|gif)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    limit: 8192
                }
            }]
        }]
    }
};