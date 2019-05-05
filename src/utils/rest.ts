import * as request from 'request';

import debug from 'debug';
const log = debug('visa:rest');

export interface VisaApiCredentials {
    userId: string;
    password: string;
    certificate: Buffer;
    certificate_passphrase: string;
}

export type options = Partial<request.UriOptions & request.CoreOptions>;

export function _get<T>(credentials: VisaApiCredentials, uri: string, options?: options) {
    const params = {
        ...options,
        uri,
        method: 'GET'
    };
    return _req<T>(credentials, params);
}

export function _delete<T>(credentials: VisaApiCredentials, uri: string, options?: options) {
    const params = {
        ...options,
        uri,
        method: 'DELETE'
    };
    return _req<T>(credentials, params);
}

export function _put(credentials: VisaApiCredentials, uri: string, body: any, options?: options) {
    const params = {
        ...options,
        uri,
        body,
        method: 'PUT'
    };
    return _req(credentials, params);
}

export function _post(credentials: VisaApiCredentials, uri: string, body: any, options?: options) {
    const params = {
        ...options,
        uri,
        body,
        method: 'POST'
    };
    return _req(credentials, params);
}

export function _req<T = any>(credentials: VisaApiCredentials, options: request.UriOptions & request.CoreOptions) {
    return new Promise<{ response: request.Response, body: T }>((resolve, reject) => {
        const defaultOptions = {
            headers: {
                'Authorization': `Basic ${new Buffer(credentials.userId + ':' + credentials.password).toString('base64')}`
            },
            agentOptions: {
                pfx: credentials.certificate,
                passphrase: credentials.certificate_passphrase
            },
            json: true
        };
        defaultObjectProperties(options, defaultOptions);
        log(options);
        request(options, (error, response, body) => {
            if (error) return reject(error);
            return resolve({ response, body });
        });
    });
}

// Generically defaults properties of 'target' to values of 'defaults'
function defaultObjectProperties<T>(target: T, defaults: Partial<T>): void {
    for (const [key, value] of Object.entries(defaults)) {
        if (!(<any>target)[key]) {
            (<any>target)[key] = value;
            continue;
        };
        defaultObjectProperties((<any>target)[key], (<any>defaults)[key]);
    }
} 
