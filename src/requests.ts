/**
 * @author Quatrecentquatre-404
 * @name Requests
 * @description Requests is a browser-side TS module which acts like an interface between XHRs and the developer. It helps to make asynchronous requests rather than using it's default callbacks.
 */

declare interface ResponseObject {
    status: number
    body: string
    json: object | null
    headers: RequestsParams['headers']
    xhr: XMLHttpRequest
}

declare interface RequestsParams {
    headers?: object
    body?: object
}

function _buildHeaders(headers: any): Map<string, string> {
    const mapHeaders: Map<string, string> = new Map()

    for (const key of Object.keys(headers)) {
        mapHeaders.set(key, `${headers[key]}`)
    }

    return mapHeaders
}

function _buildBody(body: any): string {
    let stringBody: string = ''

    for (const key of Object.keys(body)) {
        stringBody += `${key}=${body[key]}&`
    }

    return stringBody.slice(0, -1)
}


function _parseResponseHeaders(headers: string): object {
    const parsedHeaders: object = {}
    if (!headers) return parsedHeaders
    const lines = headers.split(/\r\n/g)

    for (const line of lines) {
        const key = line.split(/:/g)[0]
        if (key)
            Object.assign(parsedHeaders, key, line.split(/:/g).slice(1).join(':').trim())
    }
    return parsedHeaders
}

function _default(
    method: 'GET' | 'HEAD' | 'DELETE' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS',
    url: string,
    { headers, body }: RequestsParams = {}
): Promise<ResponseObject> {
    return new Promise(function (resolve, reject) {
        const r: XMLHttpRequest | null = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : null

        if (r === null)
            throw 'Unable to initilize XMLHttpRequest on this browser.'

        r.onload = function (e) {
            const data: ResponseObject = {
                status: r.status,
                body: r.responseText,
                json: (function (): object | null {
                    try {
                        return JSON.parse(r.responseText)
                    } catch (e) {
                        return null
                    }
                })(),
                headers: _parseResponseHeaders(r.getAllResponseHeaders()),
                xhr: r,
            }
            if (199 < r.status && r.status < 300) return resolve(data)
            else return reject(data)
        }

        r.open(method, url)

        let _body: XMLHttpRequestBodyInit = ''

        if (!!headers) {
            const _headers: Map<string, string> = _buildHeaders(headers)
            for (const [key, value] of _headers.entries())
                r.setRequestHeader(key.toLowerCase(), value)

            if (
                _headers.get('Content-Type') === 'application/json' ||
                typeof body === 'object'
            ) {
                _body = JSON.stringify(body)
            }
        }

        if (body && _body.length === 0) {
            _body = _buildBody(body)
        }

        r.send(_body)
    })
}

class Requests {
    public static async get(
        url: string,
        { headers }: RequestsParams = {}
    ): Promise<ResponseObject> {
        try {
            return await _default('GET', url, { headers: headers })
        } catch (e) {
            throw e
        }
    }

    public static async getJSON(
        url: string,
        { headers }: RequestsParams = {}
    ): Promise<ResponseObject['json']> {
        if (!!headers) Object.assign(headers, 'Accept', 'application/json')
        return (await this.get(url, { headers })).json
    }

    public static async head(
        url: string,
        { headers }: RequestsParams = {}
    ): Promise<ResponseObject> {
        try {
            return await _default('HEAD', url, { headers })
        } catch (e) {
            throw e
        }
    }

    public static async headJSON(
        url: string,
        { headers }: RequestsParams = {}
    ): Promise<ResponseObject['json']> {
        return (await this.head(url, { headers })).json
    }

    public static async delete(
        url: string,
        { headers }: RequestsParams = {}
    ): Promise<ResponseObject> {
        try {
            return await _default('DELETE', url, { headers })
        } catch (e) {
            throw e
        }
    }

    public static async deleteJSON(
        url: string,
        { headers }: RequestsParams = {}
    ): Promise<ResponseObject['json']> {
        return (await this.delete(url, { headers })).json
    }

    public static async post(
        url: string,
        { headers, body }: RequestsParams = {}
    ): Promise<ResponseObject> {
        try {
            return await _default('POST', url, { headers, body })
        } catch (e) {
            throw e
        }
    }

    public static async postJSON(
        url: string,
        { headers, body }: RequestsParams = {}
    ): Promise<ResponseObject> {
        if (!!headers) Object.assign(headers, 'Content-Type', 'application/json')
        return await this.post(url, { headers, body })
    }

    public static async patch(
        url: string,
        { headers, body }: RequestsParams = {}
    ): Promise<ResponseObject> {
        try {
            return await _default('PATCH', url, { headers, body })
        } catch (e) {
            throw e
        }
    }

    public static async patchJSON(
        url: string,
        { headers, body }: RequestsParams = {}
    ): Promise<ResponseObject> {
        if (!!headers) Object.assign(headers, 'Content-Type', 'application/json')
        return await this.patch(url, { headers, body })
    }

    public static async put(
        url: string,
        { headers, body }: RequestsParams = {}
    ): Promise<ResponseObject> {
        try {
            return await _default('PUT', url, { headers, body })
        } catch (e) {
            throw e
        }
    }

    public static async putJSON(
        url: string,
        { headers, body }: RequestsParams = {}
    ): Promise<ResponseObject> {
        if (!!headers) Object.assign(headers, 'Content-Type', 'application/json')
        return await this.put(url, { headers, body })
    }

    public static async options(
        url: string,
        { headers, body }: RequestsParams = {}
    ): Promise<ResponseObject> {
        try {
            return await _default('OPTIONS', url, { headers, body })
        } catch (e) {
            throw e
        }
    }

    public static async optionsJSON(
        url: string,
        { headers, body }: RequestsParams = {}
    ): Promise<ResponseObject> {
        if (!!headers) Object.assign(headers, 'Content-Type', 'application/json')
        return await this.options(url, { headers, body })
    }
}

export default Requests
