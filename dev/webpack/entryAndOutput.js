require('../Mode')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = { entryAndOutput }

/**
 * @param {Mode} mode 
 * @returns {import('webpack').Configuration}
 */
function entryAndOutput(mode) {
    const isDev = mode === 'dev'

    return {
        ...entryAndContext(mode),

        output: {
            clean: true,

            ...output(
                path.resolve(__dirname, '../../build'),
                mode
            )
        },

        devtool: isDev && 'source-map',

        mode: isDev ? 'development' : 'production',
        target: mode === 'node' ? 'node' : 'web',

        plugins: [
            ...htmlPluginIfNotNode(mode),
            ...transpilePluginIfNode(mode)
        ],

        externals: mode === 'node'
            ? ['react', 'react-dom', 'react-router-dom']
            : []
    }
}

/**
 * @param {Mode} mode 
 * @returns {import('webpack').Configuration}
 */
function entryAndContext(mode) {
    switch (mode) {
        case 'node':
            return {
                context: path.resolve(__dirname, '../../src'),

                entry: {
                    'App': './App.tsx'
                }
            }

        case 'dev':
            return {
                context: path.resolve(__dirname, '../indexes'),

                entry: {
                    'index': './dev.tsx'
                }
            }

        case 'web':
            return {
                context: path.resolve(__dirname, '../indexes'),

                entry: {
                    'index': './prod.tsx'
                }
            }
    }
}

/**
 * @param {string} basePath
 * @param {Mode} mode 
 * @returns {import('webpack').Configuration['output']}
 */
function output(basePath, mode) {
    if (mode === 'node') {
        return {
            path: path.resolve(basePath, 'node'),


            filename: '[name].js',

            library: {
                type: 'commonjs'
            }
        }
    }

    return {
        filename: '[name].[contenthash].js',
        ...webOutput(basePath, mode)
    }
}

/**
 * @param {string} basePath
 * @param {Exclude<Mode, 'node'>} mode 
 * @returns {import('webpack').Configuration['output']}
 */
function webOutput(basePath, mode) {
    switch (mode) {
        case 'dev':
            return {
                path: path.resolve(basePath, 'dev'),
            }

        case 'web':
            return {
                path: path.resolve(basePath, 'web'),
            }
    }
}

/**
 * @param {Mode} mode
 * @returns {import('webpack').Configuration['plugins']}
 */
function htmlPluginIfNotNode(mode) {
    if (mode === 'node') {
        return []
    }

    return [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../../index.html'),
            inject: 'body'
        })
    ]
}

/**
 * @param {Mode} mode
 * @returns {import('webpack').Configuration['plugins']}
 */
function transpilePluginIfNode(mode) {
    if (mode !== 'node') {
        return []
    }

    return [
        // new TranspilePlugin({
        //     longestCommonDir: path.resolve(__dirname, '../../src'),

        //     extentionMapping: {
        //         '.ts': '.js',
        //         '.tsx': '.js',
        //         '.jsx': '.js'
        //     },

        //     // exclude: /\.css$/
        // })
    ]
}
