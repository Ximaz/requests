/**
 * @author Quatrecentquatre-404
 * @name Requests
 * @description Requests is a browser-side JS module which acts like an interface between XHRs and the developer. It helps to make asynchronous requests rather than using it's default callbacks.
 */

declare interface ResponseObject {
    status: number
    body: string
    json: object | null
    headers: object
    xhr: XMLHttpRequest
}

namespace RequestsModule {
    function _parseResponseHeaders(headers: string): object {
        const parsedHeaders: object = {}

        if (!headers) return parsedHeaders
        const lines = headers.split(/\r\n/g)

        for (const line of lines) {
            const key = line.split(/:/g)[0]
            if (key)
                parsedHeaders[key] = line.split(/:/g).slice(1).join(':').trim()
        }
        return parsedHeaders
    }

    function _default(
        method:
            | 'GET'
            | 'HEAD'
            | 'DELETE'
            | 'POST'
            | 'PUT'
            | 'PATCH'
            | 'OPTIONS',
        url: string,
        headers: object = {},
        body: object | string = null
    ): Promise<ResponseObject> {
        return new Promise(function (resolve, reject) {
            const r: XMLHttpRequest | null = window.XMLHttpRequest
                ? new XMLHttpRequest()
                : window['ActiveXObject']
                ? new window['ActiveXObject']('Microsoft.XMLHTTP')
                : null

            if (r === null)
                throw 'Unable to initilize XMLHttpRequest on this browser.'

            r.onload = function (e) {
                const data = {
                    status: r.status,
                    body: r.responseText,
                    json: (() => {
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

            for (const [key, value] of Object.entries(headers)) {
                delete headers[key]
                headers[key.toLowerCase()] = value
                r.setRequestHeader(key.toLowerCase(), value)
            }

            if (
                headers['content-type'] === 'application/json' ||
                typeof body === 'object'
            )
                body = JSON.stringify(body)

            r.send(body)
        })
    }

    export class Requests {
        public static async get(
            url: string,
            headers: object = {}
        ): Promise<ResponseObject> {
            try {
                return await _default('GET', url, headers)
            } catch (e) {
                throw e
            }
        }

        public static async getJSON(
            url: string,
            headers: object = {}
        ): Promise<ResponseObject['json']> {
            return (await this.get(url, headers)).json
        }

        public static async head(
            url: string,
            headers: object = {}
        ): Promise<ResponseObject> {
            try {
                return await _default('HEAD', url, headers)
            } catch (e) {
                throw e
            }
        }

        public static async headJSON(
            url: string,
            headers: object = {}
        ): Promise<ResponseObject['json']> {
            return (await this.head(url, headers)).json
        }

        public static async delete(
            url: string,
            headers: object = {}
        ): Promise<ResponseObject> {
            try {
                return await _default('DELETE', url, headers)
            } catch (e) {
                throw e
            }
        }

        public static async deleteJSON(
            url: string,
            headers: object = {}
        ): Promise<ResponseObject['json']> {
            return (await this.delete(url, headers)).json
        }

        public static async post(
            url: string,
            headers: object = {},
            body: string | object = {}
        ): Promise<ResponseObject> {
            try {
                return await _default('POST', url, headers, body)
            } catch (e) {
                throw e
            }
        }

        public static async postJSON(
            url: string,
            headers: object = {},
            body: object = {}
        ): Promise<ResponseObject> {
            return await this.post(
                url,
                { ...headers, 'content-type': 'application/json' },
                body
            )
        }

        public static async patch(
            url: string,
            headers: object = {},
            body: string | object = {}
        ): Promise<ResponseObject> {
            try {
                return await _default('PATCH', url, headers, body)
            } catch (e) {
                throw e
            }
        }

        public static async patchJSON(
            url: string,
            headers: object = {},
            body: string | object = {}
        ): Promise<ResponseObject> {
            return await this.patch(
                url,
                { ...headers, 'content-type': 'application/json' },
                body
            )
        }

        public static async put(
            url: string,
            headers: object = {},
            body: string | object = {}
        ): Promise<ResponseObject> {
            try {
                return await _default('PUT', url, headers, body)
            } catch (e) {
                throw e
            }
        }

        public static async putJSON(
            url: string,
            headers: object = {},
            body: string | object = {}
        ): Promise<ResponseObject> {
            return await this.put(
                url,
                { ...headers, 'content-type': 'application/json' },
                body
            )
        }

        public static async options(
            url: string,
            headers: object = {},
            body: string | object = {}
        ): Promise<ResponseObject> {
            try {
                return await _default('OPTIONS', url, headers, body)
            } catch (e) {
                throw e
            }
        }

        public static async optionsJSON(
            url: string,
            headers: object = {},
            body: string | object = {}
        ): Promise<ResponseObject> {
            return await this.options(
                url,
                { ...headers, 'content-type': 'application/json' },
                body
            )
        }
    }
}
