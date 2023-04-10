require('../Mode')
module.exports = { assets }

/**
 * @param {Mode} mode
 * @returns {import('webpack').Configuration}
 */
function assets(mode) {
    return {
        output: {
            assetModuleFilename: '[name].[contenthash][ext]'
        },

        module: {
            rules: [
                {
                    test: /\.(webp|jpg)$/,
                    exclude: /node_modules/,
                    type: 'asset/resource',
    
                    generator: {
                        emit: mode !== 'node'
                    },
                }
            ]
        }
    }
}
