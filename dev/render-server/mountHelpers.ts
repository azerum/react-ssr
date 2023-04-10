import fs from 'fs/promises'

export function normalizePath(urlPath: string) {
    if (['/index.html', '/', ''].includes(urlPath)) {
        return '/'
    }

    return urlPath
}

export function isAssetPath(urlPath: string) {
    return urlPath.includes('.')
}

export async function readIndexHtml(compiledDir: URL) {
    return await fs.readFile(
        new URL('index.html', compiledDir), 
        { encoding: 'utf-8' }
    )
}
