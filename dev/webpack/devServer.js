require('../Mode')
module.exports = { devServer }

/**
 * @param {Mode} mode
 * @returns {import('webpack').Configuration}
 */
function devServer(mode) {
    if (mode === 'dev') {
        return {
            devServer: {
                hot: true,

                proxy: {
                    //First, don't proxy requests to URL paths that contain dot --
                    //those are always (well, usually) are paths to assets
                    path: (pathname) => !pathname.includes("."),

                    //If the path doesn't contain dot, serve `index.html`

                    target: "http://localhost:9000",
                    pathRewrite: (pathname) => '/index.html'
                },

                port: 8080
            }
        }
    }

    return {}
}
