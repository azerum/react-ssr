import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '../../src/App'
import props from '../../props'
import { BrowserRouter } from 'react-router-dom'

const container = document.querySelector('#root')!
const root = createRoot(container)

root.render(
    <BrowserRouter>
        <App {...props} />
    </BrowserRouter>
)
