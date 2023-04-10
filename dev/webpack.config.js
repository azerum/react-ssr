require('./Mode')
const { merge } = require('webpack-merge')
const { entryAndOutput } = require('./webpack/entryAndOutput')
const { js } = require('./webpack/js')
const { assets } = require('./webpack/assets')
const { css } = require('./webpack/css')
const { devServer } = require('./webpack/devServer')

/**
 * @type {Mode}
 */
const mode = process.env.MODE

const config = merge(
    entryAndOutput(mode),
    devServer(mode),
    js(mode),
    css(mode),
    assets(mode),
)

// console.dir(config, { depth: 100 })

module.exports = config
