import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { App } from '../../src/App'
import { BrowserRouter } from 'react-router-dom'

const root = document.querySelector('#root')!

const props = (window as any)['S']
const basePath = (window as any)['B']

hydrateRoot(
    root,
    <BrowserRouter basename={basePath}>
        <App {...props} />
    </BrowserRouter>
)
