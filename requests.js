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
                if (key)
                    parsedHeaders[key] = line
                        .split(/:/g)
                        .slice(1)
                        .join(':')
                        .trim()
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

                for (let [key, value] of Object.entries(headers))
                    r.setRequestHeader(key, value)

                r.send(body)

                r.onload = () => {
                    const data = {
                        status: this.status,
                        body: this.responseText,
                        headers: _parseResponseHeaders(
                            this.getAllResponseHeaders()
                        ),
                        raw_request: this,
                    }
                    if (199 < this.status < 300) resolve(data)
                    else reject(data)
                }
            })
        }

        this.get = (url, headers) => {
            return new Promise((resolve, reject) => {
                _default('GET', url, headers)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error))
            })
        }

        this.delete = (url, headers) => {
            return new Promise((resolve, reject) => {
                _default('DELETE', url, headers)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error))
            })
        }

        this.post = (url, headers, body) => {
            return new Promise((resolve, reject) => {
                _default('POST', url, headers, body)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error))
            })
        }

        this.patch = (url, headers, body) => {
            return new Promise((resolve, reject) => {
                _default('PATCH', url, headers, body)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error))
            })
        }

        this.put = (url, headers, body) => {
            return new Promise((resolve, reject) => {
                _default('PUT', url, headers, body)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error))
            })
        }

        this.options = (url, headers, body) => {
            return new Promise((resolve, reject) => {
                _default('OPTIONS', url, headers, body)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error))
            })
        }
    }
}
