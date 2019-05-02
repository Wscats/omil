const compileAll = require('./loaders/index')
const path = require('path')
const fs = require('fs')
const {
    getOptions
} = require('loader-utils')
module.exports = function (source, map) {
    const callback = this.async();
    // console.log(getOptions, this)
    const options = getOptions(this) || {}
    // console.log(options)
    const output = compileAll(source, options, callback)
    // console.log(output)
    // return output
};