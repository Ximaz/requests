/**
 * @author Quatrecentquatre-404
 * @name Requests
 * @description Requests is a browser-side JS module which acts like an interface between XHRs and the developer. It helps to make asynchronous requests rather than using it's default callbacks.
 */

/**
 * Parse response headers as an object
 * @param {string} headers String representing headers
 * @returns {object} Parsed headers
 */
function _parseResponseHeaders(headers) {
    if (!headers) return {}
    const lines = headers.split(/\r\n/g),
        parsedHeaders = {}

    for (const line of lines) {
        const key = line.split(/:/g)[0]
        if (key) parsedHeaders[key] = line.split(/:/g).slice(1).join(':').trim()
    }
    return parsedHeaders
}

/**
 * Default request wrapper
 * @param {string} method Request method
 * @param {string} url URL to fetch
 * @param {object} headers Request headers
 * @param {string} body Content to send, string or object, depends on Content-Type
 * @returns {object} Response
 */
function _default(method, url, headers = {}, body = {}) {
    return new Promise(function (resolve, reject) {
        const r = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : window.ActiveXObject
            ? new ActiveXObject('Microsoft.XMLHTTP')
            : null

        if (r === null)
            throw 'Unable to initilize XMLHttpRequest on this browser.'

        r.onload = function () {
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
            if (199 < r.status < 300) return resolve(data)
            else return reject(data)
        }

        r.open(method, url)

        for (const [key, value] of Object.entries(headers)) {
            delete headers[key]
            headers[key.toLowerCase()] = value
            r.setRequestHeader(key.toLowerCase(), value)
        }

        if (headers['content-type'] === 'application/json')
            body = JSON.stringify(body)

        r.send(body)
    })
}

class Requests {
    /**
     * GET
     * @param {string} url URL to fetch
     * @param {object} headers Request headers
     * @returns {object} Response
     */
    static async get(url, headers = {}) {
        try {
            return await _default('GET', url, headers)
        } catch (e) {
            throw e
        }
    }

    /**
     * GET JSON
     * @param {string} url URL to fetch
     * @param {object} headers Request headers
     * @returns {object} JSON response
     */
    static async getJSON(url, headers = {}) {
        return (await this.get(url, headers)).json
    }

    /**
     * HEAD
     * @param {string} url URL to fetch
     * @param {object} headers Request headers
     * @returns {object} Response
     */
     static async head(url, headers = {}) {
        try {
            return await _default('HEAD', url, headers)
        } catch (e) {
            throw e
        }
    }

    /**
     * HEAD JSON
     * @param {string} url URL to fetch
     * @param {object} headers Request headers
     * @returns {object} Response
     */
     static async headJSON(url, headers = {}) {
        return (await this.head(url, headers)).json
    }

    /**
     * DELETE
     * @param {string} url URL to fetch
     * @param {object} headers Request headers
     * @returns {object} Response
     */
     static async delete(url, headers = {}) {
        try {
            return await _default('DELETE', url, headers)
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
     static async deleteJSON(url, headers = {}) {
        return (await this.delete(url, headers)).json
    }

    /**
     * POST
     * @param {string} url URL to fetch
     * @param {object} headers Request headers
     * @param {string} body Content to send, string or object, depends on Content-Type header
     * @returns {object} Response
     */
    static async post(url, headers = {}, body = null) {
        try {
            return await _default('POST', url, headers, body)
        } catch (e) {
            throw e
        }
    }

    /**
     * POST JSON
     * @param {string} url URL to fetch
     * @param {object} headers Request headers
     * @param {object} body Content to send, string or object, depends on Content-Type header
     * @returns {object} Response
     */
    static async postJSON(url, headers = {}, body = {}) {
        return await this.post(url, {...headers, "content-type": "application/json"}, JSON.stringify(body))
    }

    /**
     * PATCH
     * @param {string} url URL to fetch
     * @param {object} headers Request headers
     * @param {string} body Content to send, string or object, depends on Content-Type header
     * @returns {object} Response
     */
    static async patch(url, headers = {}, body = null) {
        try {
            return await _default('PATCH', url, headers, body)
        } catch (e) {
            throw e
        }
    }

    /**
     * PATCH JSON
     * @param {string} url URL to fetch
     * @param {object} headers Request headers
     * @param {object} body Content to send, string or object, depends on Content-Type header
     * @returns {object} Response
     */
    static async patchJSON(url, headers = {}, body = {}) {
        return await this.patch(url, {...headers, "content-type": "application/json"}, JSON.stringify(body))
    }

    /**
     * PUT
     * @param {string} url URL to fetch
     * @param {object} headers Request headers
     * @param {string} body Content to send, string or object, depends on Content-Type header
     * @returns {object} Response
     */
    static async put(url, headers = {}, body = null) {
        try {
            return await _default('PUT', url, headers, body)
        } catch (e) {
            throw e
        }
    }

    /**
     * PUT JSON
     * @param {string} url URL to fetch
     * @param {object} headers Request headers
     * @param {object} body Content to send, string or object, depends on Content-Type header
     * @returns {object} Response
     */
    static async putJSON(url, headers = {}, body = {}) {
        return await this.put(url, {...headers, "content-type": "application/json"}, JSON.stringify(body))
    }

    /**
     * OPTIONS
     * @param {string} url URL to fetch
     * @param {object} headers Request headers
     * @param {string} body Content to send, string or object, depends on Content-Type header
     * @returns {object} Response
     */
    static async options(url, headers = {}, body = null) {
        try {
            return await _default('OPTIONS', url, headers, body)
        } catch (e) {
            throw e
        }
    }

    /**
     * OPTIONS JSON
     * @param {string} url URL to fetch
     * @param {object} headers Request headers
     * @param {object} body Content to send, string or object, depends on Content-Type header
     * @returns {object} Response
     */
    static async optionsJSON(url, headers = {}, body = {}) {
        return await this.options(url, {...headers, "content-type": "application/json"}, JSON.stringify(body))
    }
}
