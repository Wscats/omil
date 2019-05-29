const compileAll = require('./loaders/index')
const path = require('path')
const fs = require('fs')

module.exports = function (source, map) {
    // use in omi-snippets
    if (typeof source === 'object') {
        const callback = (info, code, map) => {
            return code
        }
        const sourceObj = source
        const output = compileAll(sourceObj, source.options, source.callback)
        const compileSass = require('./styles/extension/index').compileSass
        return {
            compileSass,
        }
    } else {
        const callback = this.async()
        const sourceObj = {
            source
        }
        // use in webpack loader
        const {
            getOptions
        } = require('loader-utils')
        const options = getOptions(this) || {}
        const output = compileAll(sourceObj, options, callback)
    }
};