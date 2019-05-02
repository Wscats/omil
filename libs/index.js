const compileAll = require('./loaders/index')
const path = require('path')
const fs = require('fs')
const {
    getOptions
} = require('loader-utils')
module.exports = function (source, map) {
    const callback = this.async();
    const options = getOptions(this) || {}
    const output = compileAll(source, options, callback)
    // return output
};