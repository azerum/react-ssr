require('../Mode')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = { css }

/**
 * @param {Mode} mode 
 * @returns {import('webpack').Configuration}
 */
function css(mode) {
    return merge(
        loadersAndPlugins(mode),
        optimization(mode)
    )
}

/**
 * @param {Mode} mode
 * @returns {import('webpack').Configuration}
 */
function loadersAndPlugins(mode) {
    const useMiniCss = mode === 'web'

    const nextLoader = useMiniCss
        ? MiniCssExtractPlugin.loader
        : 'style-loader'

    const cssLoader = {
        loader: 'css-loader',

        options: {
            esModule: false,
            url: true
        }
    }

    const plugins = useMiniCss
        ? [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            })
        ]
        : []

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [nextLoader, cssLoader]
                },
            ]
        },

        plugins
    }
}

/**
 * @param {Mode} mode 
 * @returns {import('webpack').Configuration}
 */
function optimization(mode) {
    if (mode === 'dev') {
        return {}
    }

    return {
        optimization: {
            minimizer: [
                // Use built-in minimizers:
                '...',

                new CssMinimizerPlugin()
            ]
        }
    }
}
