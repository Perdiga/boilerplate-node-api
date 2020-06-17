import { HttpMethods as Methods } from './HttpMethods';
/**
 * This class is of optional use.
 * Can be used to make a custom request with the Http class WITHOUT using the standard public methods.
 * (Those are `Http.get`, `Http.post`, `Http.patch`, `Http.put`, `Http.delete`).
 *  This is how we instantiate an object of `RequestOptions` to be used in the
 * `Http.request(options: RequestOptions)` method.
 */
export class HttpOptions {

    method: Methods;
    target: string;
    headers?: any;
    body?: any;
    queryString?: any;
    contentType?: string;

    constructor (method: Methods, target: string, body?: any, queryString?: any, headers?: string, contentType?: string) {
        this.method = method;
        this.target = target;
        if (headers) { this.headers = headers; }
        if (body) { this.body = JSON.stringify(body); }
        if (queryString) { this.queryString = JSON.stringify(queryString); }
        this.contentType = contentType ? contentType : 'json';
    }
}