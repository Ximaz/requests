/**
 * @author Quatrecentquatre
 * @name Requests
 * @description This is a modular class to perfom requests easier. It's an interface between the developer and XHRs.
 */

class Requests {
    constructor() {
        /**
         * Parse response headers as an object
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
         * Default request wrapper
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
                    r.setRequestHeader(key.toLowerCase(), value)

                r.send(body)

                r.onload = () => {
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
                        headers: _parseResponseHeaders(
                            r.getAllResponseHeaders()
                        ),
                        xhr: r,
                    }
                    if (199 < r.status < 300) resolve(data)
                    else reject(data)
                }
            })
        }

        /**
         * GET
         * @param {string} url URL to fetch
         * @param {object} headers Request headers
         * @returns {object} Response
         */
        this.get = async function (url, headers) {
            try {
                return await _default('GET', url, headers)
            } catch (e) {
                throw e
            }
        }

        /**
         * HEAD
         * @param {string} url URL to fetch
         * @param {object} headers Request headers
         * @returns {object} Response
         */
        this.head = async function (url, headers) {
            try {
                return await _default('HEAD', url, headers)
            } catch (e) {
                throw e
            }
        }

        /**
         * DELETE
         * @param {string} url URL to fetch
         * @param {object} headers Request headers
         * @returns {object} Response
         */
        this.delete = async function (url, headers) {
            try {
                return await _default('DELETE', url, headers)
            } catch (e) {
                throw e
            }
        }

        /**
         * POST
         * @param {string} url URL to fetch
         * @param {object} headers Request headers
         * @param {string|object} body Content to send, string or object, depends on Content-Type header
         * @returns {object} Response
         */
        this.post = async function (url, headers, body) {
            try {
                return await _default('POST', url, headers, body)
            } catch (e) {
                throw e
            }
        }

        /**
         * PATCH
         * @param {string} url URL to fetch
         * @param {object} headers Request headers
         * @param {string|object} body Content to send, string or object, depends on Content-Type header
         * @returns {object} Response
         */
        this.patch = async function (url, headers, body) {
            try {
                return await _default('PATCH', url, headers, body)
            } catch (e) {
                throw e
            }
        }

        /**
         * PUT
         * @param {string} url URL to fetch
         * @param {object} headers Request headers
         * @param {string|object} body Content to send, string or object, depends on Content-Type header
         * @returns {object} Response
         */
        this.put = async function (url, headers, body) {
            try {
                return await _default('PUT', url, headers, body)
            } catch (e) {
                throw e
            }
        }

        /**
         * OPTIONS
         * @param {string} url URL to fetch
         * @param {object} headers Request headers
         * @param {string|object} body Content to send, string or object, depends on Content-Type header
         * @returns {object} Response
         */
        this.options = async function (url, headers, body = {}) {
            try {
                return await _default('OPTIONS', url, headers, (body = {}))
            } catch (e) {
                throw e
            }
        }
    }
}
