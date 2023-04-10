import express from 'express'
import url from 'url'
import { asyncCatch } from './asyncCatch'
import { isAssetPath, normalizePath, readIndexHtml } from './mountHelpers'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { StaticRouter } from 'react-router-dom/server'

import { App } from '../../build/node/App'
import props from '../../props'

const BASE_PATH = '/foo'
const COMPILED_DIR = new URL('../../build/web/', import.meta.url)

const app = express()

async function main() {
    const indexHtml = await readIndexHtml(COMPILED_DIR)

    app.get(`${BASE_PATH}:subPath(*)`, asyncCatch(async (request, response, next) => {
        const subPath = normalizePath(request.params.subPath!)

        if (isAssetPath(subPath)) {
            next()
            return
        }

        const globalsHtml = 
            `<script>var S=${JSON.stringify(props)};` + 
            `var B=${JSON.stringify(BASE_PATH)}</script>`
        
        const appHtml = renderToString(
            React.createElement(
                StaticRouter, 
                {
                    location: request.url 
                },
                React.createElement(App, props)
            )
        )

        const renderedRoot = `<div id="root">${appHtml}</div>`

        const replaced = indexHtml.replace(
            '<div id="root"></div>',
            `${globalsHtml}${renderedRoot}`
        )

        response.contentType('html')
        response.send(replaced).end()
    }))

    const staticHandler = express.static(
        url.fileURLToPath(COMPILED_DIR),
        {
            maxAge: 60 * 60 * 1000
        }
    )

    app.use(BASE_PATH, staticHandler)
    app.listen(8081, () => console.log('Listening on 8081'))
}

main()
