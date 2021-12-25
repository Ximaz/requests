/**
 * @author Quatrecentquatre-404
 * @name Requests
 * @description Requests is a browser-side TS module which acts like an interface between XHRs and the developer. It helps to make asynchronous requests rather than using it's default callbacks.
 */
declare interface ResponseObject {
    status: number;
    body: string;
    json: object | null;
    headers: RequestsParams['headers'];
    xhr: XMLHttpRequest;
}
declare interface RequestsParams {
    headers?: object;
    body?: object;
}
declare class Requests {
    static get(url: string, { headers }?: RequestsParams): Promise<ResponseObject>;
    static getJSON(url: string, { headers }?: RequestsParams): Promise<ResponseObject['json']>;
    static head(url: string, { headers }?: RequestsParams): Promise<ResponseObject>;
    static headJSON(url: string, { headers }?: RequestsParams): Promise<ResponseObject['json']>;
    static delete(url: string, { headers }?: RequestsParams): Promise<ResponseObject>;
    static deleteJSON(url: string, { headers }?: RequestsParams): Promise<ResponseObject['json']>;
    static post(url: string, { headers, body }?: RequestsParams): Promise<ResponseObject>;
    static postJSON(url: string, { headers, body }?: RequestsParams): Promise<ResponseObject>;
    static patch(url: string, { headers, body }?: RequestsParams): Promise<ResponseObject>;
    static patchJSON(url: string, { headers, body }?: RequestsParams): Promise<ResponseObject>;
    static put(url: string, { headers, body }?: RequestsParams): Promise<ResponseObject>;
    static putJSON(url: string, { headers, body }?: RequestsParams): Promise<ResponseObject>;
    static options(url: string, { headers, body }?: RequestsParams): Promise<ResponseObject>;
    static optionsJSON(url: string, { headers, body }?: RequestsParams): Promise<ResponseObject>;
}
export default Requests;
