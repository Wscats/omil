const compileAll = require('./loaders/index')
const path = require('path')
const fs = require('fs')
const {
    getOptions
} = require('loader-utils')
module.exports = function (source, map) {
    if (typeof source === 'object') {
        const callback = (info, code, map) => {
            return code
        }
        const sourceObj = source
        const output = compileAll(sourceObj, source.options, source.callback)
    } else {
        const callback = this.async()
        const sourceObj = {
            source
        }
        const options = getOptions(this) || {}
        const output = compileAll(sourceObj, options, callback)
    }
};