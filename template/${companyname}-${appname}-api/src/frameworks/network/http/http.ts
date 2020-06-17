import { HttpResponse } from './HttpResponse';
import { HttpOptions as Options } from './HttpOptions';

/**
 * Http Interface
 */
export default interface Http {
  /**
   * Sends a HTTP request to the target endpoint
   * @param options An object containing optional configurations to build the request
   */
  request(options: Options): Promise<HttpResponse>;
  /**
   * Sends an HTTP GET request
   * @param url The target URL
   * @param headers The request headers
   * @param params Params to be send on the query string
   * @param type The content-type
   */
  get(url: string, headers?: any, params?: any, type?: string): Promise<HttpResponse>;
  /**
   * Sends an HTTP POST request
   * @param url The target URL
   * @param body The request body
   * @param headers The request headers
   * @param params Params to be send on the query string
   * @param type The content-type
   */
  post(url: string, body: any, headers?: any, params?: any, type?: string): Promise<HttpResponse>;
  /**
   * Sends an HTTP PUT request
   * @param url The target URL
   * @param body The request body
   * @param headers The request headers
   * @param params Params to be send on the query string
   * @param type The content-type
   */
  put(url: string, body: any, headers?: any, params?: any, type?: string): Promise<HttpResponse>;
  /**
   * Sends an HTTP PATCH request
   * @param url The target URL
   * @param body The request body
   * @param headers The request headers
   * @param params Params to be send on the query string
   * @param type The content-type
   */
  patch(url: string, body: any, headers?: any, params?: any, type?: string): Promise<HttpResponse>;

  /**
   * Sends an HTTP DELETE request
   * @param url The target URL
   * @param headers The request headers
   * @param params Params to be send on the query string
   * @param type The content-type
   */
  delete(url: string, headers?: any, params?: any, type?: string): Promise<HttpResponse>;

}
