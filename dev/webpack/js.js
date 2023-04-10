require('../Mode')
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const path = require('path')

module.exports = { js }

/**
 * @param {Mode} mode
 * @returns {import('webpack').Configuration}
 */
function js(mode) {
    const babel = babelLoader(mode)
    const ts = tsLoader()

    return {
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [babel]
                },

                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [babel, ts]
                }
            ]
        },

        plugins: refreshPluginIfDev(mode)
    }
}

/**
 * @param {Mode} mode 
 * @returns {import('webpack').RuleSetUseItem}
 */
function babelLoader(mode) {
    const targets = mode === 'node'
        ? []
        : [
            'defaults',
            'not op_mini all'
        ]

    const plugins = mode === 'dev'
        ? ['react-refresh/babel']
        : []

    return {
        loader: 'babel-loader',

        options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            targets,
            plugins
        }
    }
}

/**
 * @param {Mode} mode 
 * @returns {import('webpack').Configuration['plugins']}
 */
function refreshPluginIfDev(mode) {
    // https://github.com/pmmmwh/react-refresh-webpack-plugin

    if (mode === 'dev') {
        return [
            new ReactRefreshWebpackPlugin()
        ]
    }

    return []
}

function tsLoader() {
    // https://www.npmjs.com/package/ts-loader

    return {
        loader: 'ts-loader',
        
        options: {
            configFile: path.resolve(__dirname, '../tsconfig-build.json')
        }
    }
}
