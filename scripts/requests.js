/**
 * @author Quatrecentquatre
 * @name Requests
 * @description This is a modular class to perfome requests easier. It's an interface between the developper and XHRs.
 */

class Requests {
    constructor() {
        /**
         *
         * @param {string} headers String representing headers
         * @returns {object} Parsed headers
         */
        const _parseResponseHeaders = (headers) => {
            if (!headers) return {}
            const lines = headers.split(/\r\n/g),
                parsedHeaders = {}
            for (let line of lines) {
                const key = line.split(/:/g)[0]
                if (!key) continue
                parsedHeaders[key] = line.split(/:/g).slice(1).join(':').trim()
            }
            return parsedHeaders
        }

        /**
         *
         * @param {string} method Request method
         * @param {string} url URL to fetch
         * @param {object} headers Request headers
         * @param {string|object} body Content to send, string or object, depends on Content-Type
         * @returns {object} Response
         */
        const _default = (method, url, headers = {}, body = {}) => {
            return new Promise((resolve, reject) => {
                const r = new XMLHttpRequest()
                r.open(method, url)

                Object.keys(headers).forEach((key) =>
                    r.setRequestHeader(key, headers[key])
                )

                r.send(body)

                r.onload = () => {
                    const data = {
                        status: r.status,
                        body: r.responseText,
                        headers: _parseResponseHeaders(
                            r.getAllResponseHeaders()
                        ),
                        raw_request: r,
                    }
                    if (199 < r.status < 300) resolve(data)
                    else reject(data)
                }
            })
        }

        this.get = (url, headers) => {
            return new Promise((resolve, reject) => {
                _default('GET', url, headers)
                    .then((data) => resolve(data))
                    .catch((data) => reject(data))
            })
        }

        this.delete = (url, headers) => {
            return new Promise((resolve, reject) => {
                _default('DELETE', url, headers)
                    .then((data) => resolve(data))
                    .catch((data) => reject(data))
            })
        }

        this.post = (url, headers, body) => {
            return new Promise((resolve, reject) => {
                _default('POST', url, headers, body)
                    .then((data) => resolve(data))
                    .catch((data) => reject(data))
            })
        }

        this.patch = (url, headers, body) => {
            return new Promise((resolve, reject) => {
                _default('PATCH', url, headers, body)
                    .then((data) => resolve(data))
                    .catch((data) => reject(data))
            })
        }

        this.put = (url, headers, body) => {
            return new Promise((resolve, reject) => {
                _default('PUT', url, headers, body)
                    .then((data) => resolve(data))
                    .catch((data) => reject(data))
            })
        }

        this.options = (url, headers, body) => {
            return new Promise((resolve, reject) => {
                _default('OPTIONS', url, headers, body)
                    .then((data) => resolve(data))
                    .catch((data) => reject(data))
            })
        }
    }
}
