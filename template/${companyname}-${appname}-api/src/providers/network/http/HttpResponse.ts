/**
 * This is what you can expect to receive after using ANY of the Http methods.
 */
export interface HttpResponse {
    status: number;
    statusText: string;
    headers: any;
    config: any;
    baseURL: string;
    timeout: number;
    method: string;
    data: any;
}