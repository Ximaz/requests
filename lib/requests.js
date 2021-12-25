/**
 * @author Quatrecentquatre-404
 * @name Requests
 * @description Requests is a browser-side TS module which acts like an interface between XHRs and the developer. It helps to make asynchronous requests rather than using it's default callbacks.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function _buildHeaders(headers) {
    const mapHeaders = new Map();
    for (const key of Object.keys(headers)) {
        mapHeaders.set(key, `${headers[key]}`);
    }
    return mapHeaders;
}
function _buildBody(body) {
    let stringBody = '';
    for (const key of Object.keys(body)) {
        stringBody += `${key}=${body[key]}&`;
    }
    return stringBody.slice(0, -1);
}
function _parseResponseHeaders(headers) {
    const parsedHeaders = {};
    if (!headers)
        return parsedHeaders;
    const lines = headers.split(/\r\n/g);
    for (const line of lines) {
        const key = line.split(/:/g)[0];
        if (key)
            Object.assign(parsedHeaders, key, line.split(/:/g).slice(1).join(':').trim());
    }
    return parsedHeaders;
}
function _default(method, url, { headers, body } = {}) {
    return new Promise(function (resolve, reject) {
        const r = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : null;
        if (r === null)
            throw 'Unable to initilize XMLHttpRequest on this browser.';
        r.onload = function (e) {
            const data = {
                status: r.status,
                body: r.responseText,
                json: (function () {
                    try {
                        return JSON.parse(r.responseText);
                    }
                    catch (e) {
                        return null;
                    }
                })(),
                headers: _parseResponseHeaders(r.getAllResponseHeaders()),
                xhr: r,
            };
            if (199 < r.status && r.status < 300)
                return resolve(data);
            else
                return reject(data);
        };
        r.open(method, url);
        let _body = '';
        if (!!headers) {
            const _headers = _buildHeaders(headers);
            for (const [key, value] of _headers.entries())
                r.setRequestHeader(key.toLowerCase(), value);
            if (_headers.get('Content-Type') === 'application/json' ||
                typeof body === 'object') {
                _body = JSON.stringify(body);
            }
        }
        if (body && _body.length === 0) {
            _body = _buildBody(body);
        }
        r.send(_body);
    });
}
class Requests {
    static get(url, { headers } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield _default('GET', url, { headers: headers });
            }
            catch (e) {
                throw e;
            }
        });
    }
    static getJSON(url, { headers } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!headers)
                Object.assign(headers, 'Accept', 'application/json');
            return (yield this.get(url, { headers })).json;
        });
    }
    static head(url, { headers } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield _default('HEAD', url, { headers });
            }
            catch (e) {
                throw e;
            }
        });
    }
    static headJSON(url, { headers } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.head(url, { headers })).json;
        });
    }
    static delete(url, { headers } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield _default('DELETE', url, { headers });
            }
            catch (e) {
                throw e;
            }
        });
    }
    static deleteJSON(url, { headers } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.delete(url, { headers })).json;
        });
    }
    static post(url, { headers, body } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield _default('POST', url, { headers, body });
            }
            catch (e) {
                throw e;
            }
        });
    }
    static postJSON(url, { headers, body } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!headers)
                Object.assign(headers, 'Content-Type', 'application/json');
            return yield this.post(url, { headers, body });
        });
    }
    static patch(url, { headers, body } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield _default('PATCH', url, { headers, body });
            }
            catch (e) {
                throw e;
            }
        });
    }
    static patchJSON(url, { headers, body } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!headers)
                Object.assign(headers, 'Content-Type', 'application/json');
            return yield this.patch(url, { headers, body });
        });
    }
    static put(url, { headers, body } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield _default('PUT', url, { headers, body });
            }
            catch (e) {
                throw e;
            }
        });
    }
    static putJSON(url, { headers, body } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!headers)
                Object.assign(headers, 'Content-Type', 'application/json');
            return yield this.put(url, { headers, body });
        });
    }
    static options(url, { headers, body } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield _default('OPTIONS', url, { headers, body });
            }
            catch (e) {
                throw e;
            }
        });
    }
    static optionsJSON(url, { headers, body } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!headers)
                Object.assign(headers, 'Content-Type', 'application/json');
            return yield this.options(url, { headers, body });
        });
    }
}
export default Requests;
//# sourceMappingURL=requests.js.map