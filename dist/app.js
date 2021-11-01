var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * @author Quatrecentquatre-404
 * @name Requests
 * @description Requests is a browser-side JS module which acts like an interface between XHRs and the developer. It helps to make asynchronous requests rather than using it's default callbacks.
 */
var RequestsModule;
(function (RequestsModule) {
    function _parseResponseHeaders(headers) {
        var parsedHeaders = {};
        if (!headers)
            return parsedHeaders;
        var lines = headers.split(/\r\n/g);
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var key = line.split(/:/g)[0];
            if (key)
                parsedHeaders[key] = line.split(/:/g).slice(1).join(':').trim();
        }
        return parsedHeaders;
    }
    function _default(method, url, headers, body) {
        if (headers === void 0) { headers = {}; }
        if (body === void 0) { body = null; }
        return new Promise(function (resolve, reject) {
            var r = window.XMLHttpRequest
                ? new XMLHttpRequest()
                : window['ActiveXObject']
                    ? new window['ActiveXObject']('Microsoft.XMLHTTP')
                    : null;
            if (r === null)
                throw 'Unable to initilize XMLHttpRequest on this browser.';
            r.onload = function (e) {
                var data = {
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
                    xhr: r
                };
                if (199 < r.status && r.status < 300)
                    return resolve(data);
                else
                    return reject(data);
            };
            r.open(method, url);
            for (var _i = 0, _a = Object.entries(headers); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                delete headers[key];
                headers[key.toLowerCase()] = value;
                r.setRequestHeader(key.toLowerCase(), value);
            }
            if (headers['content-type'] === 'application/json' ||
                typeof body === 'object')
                body = JSON.stringify(body);
            r.send(body);
        });
    }
    var Requests = /** @class */ (function () {
        function Requests() {
        }
        Requests.get = function (url, headers) {
            if (headers === void 0) { headers = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, _default('GET', url, headers)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            e_1 = _a.sent();
                            throw e_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        Requests.getJSON = function (url, headers) {
            if (headers === void 0) { headers = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.get(url, headers)];
                        case 1: return [2 /*return*/, (_a.sent()).json];
                    }
                });
            });
        };
        Requests.head = function (url, headers) {
            if (headers === void 0) { headers = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, _default('HEAD', url, headers)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            e_2 = _a.sent();
                            throw e_2;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        Requests.headJSON = function (url, headers) {
            if (headers === void 0) { headers = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.head(url, headers)];
                        case 1: return [2 /*return*/, (_a.sent()).json];
                    }
                });
            });
        };
        Requests["delete"] = function (url, headers) {
            if (headers === void 0) { headers = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, _default('DELETE', url, headers)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            e_3 = _a.sent();
                            throw e_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        Requests.deleteJSON = function (url, headers) {
            if (headers === void 0) { headers = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this["delete"](url, headers)];
                        case 1: return [2 /*return*/, (_a.sent()).json];
                    }
                });
            });
        };
        Requests.post = function (url, headers, body) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, _default('POST', url, headers, body)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            e_4 = _a.sent();
                            throw e_4;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        Requests.postJSON = function (url, headers, body) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.post(url, __assign(__assign({}, headers), { 'content-type': 'application/json' }), body)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Requests.patch = function (url, headers, body) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var e_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, _default('PATCH', url, headers, body)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            e_5 = _a.sent();
                            throw e_5;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        Requests.patchJSON = function (url, headers, body) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.patch(url, __assign(__assign({}, headers), { 'content-type': 'application/json' }), body)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Requests.put = function (url, headers, body) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var e_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, _default('PUT', url, headers, body)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            e_6 = _a.sent();
                            throw e_6;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        Requests.putJSON = function (url, headers, body) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.put(url, __assign(__assign({}, headers), { 'content-type': 'application/json' }), body)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Requests.options = function (url, headers, body) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var e_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, _default('OPTIONS', url, headers, body)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            e_7 = _a.sent();
                            throw e_7;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        Requests.optionsJSON = function (url, headers, body) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.options(url, __assign(__assign({}, headers), { 'content-type': 'application/json' }), body)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return Requests;
    }());
    RequestsModule.Requests = Requests;
})(RequestsModule || (RequestsModule = {}));
/// <reference path="src/requests.ts" />
function get_UsageExample(name) {
    return __awaiter(this, void 0, void 0, function () {
        var age, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, RequestsModule.Requests.getJSON("https://api.agify.io/?name=" + name)
                        // You also could do :
                        //
                        // const { age, name }: any = (await RequestsModule.Requests.get("https://api.agify.io/?name=bella")).json
                    ];
                case 1:
                    age = (_a.sent()).age;
                    // You also could do :
                    //
                    // const { age, name }: any = (await RequestsModule.Requests.get("https://api.agify.io/?name=bella")).json
                    console.log("My name is " + name + " and I'm " + age + " years old.");
                    return [3 /*break*/, 3];
                case 2:
                    e_8 = _a.sent();
                    throw e_8;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function post_UsageExample(title, body) {
    return __awaiter(this, void 0, void 0, function () {
        var id, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, RequestsModule.Requests.postJSON('https://jsonplaceholder.typicode.com/posts', { title: title, body: body, userId: 1 })];
                case 1:
                    id = (_a.sent()).json.id;
                    // You also could do :
                    //
                    // const { id }: any = (await RequestsModule.Requests.post("https://jsonplaceholder.typicode.com/posts", {"Content-type": "application/json"}, { title, body, userId: 1})).json
                    console.log("The article has been created and has the ID " + id + ".");
                    return [3 /*break*/, 3];
                case 2:
                    e_9 = _a.sent();
                    throw e_9;
                case 3: return [2 /*return*/];
            }
        });
    });
}
get_UsageExample("bella");
post_UsageExample("This is a new article", "Hello world, it's just a quick example.");
